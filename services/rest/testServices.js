const Tests = require("../../models/test");
const Lessons = require("../../models/lesson");
const Questions = require("../../models/question");
const Users = require("../../models/user");
const mongoose = require("mongoose");
const { getResponse } = require("../../services/completion/completion");
const { userWritingPrompt } = require("../../utils/prompts");

const getTests = async () => {
    const tests = await Tests.find();
    return tests;
};

const getTestById = async (testId) => {
    const test = await Tests.findById(testId);
    return test;
};

const postTest = async (topic, title, difficulty, lessonList) => {
    const test = new Tests({
        topic: topic,
        title: title,
        difficulty: difficulty,
        lessonList: lessonList,
    });
    await test.save();
    return test;
};

const deleteTest = async (testId) => {
    await Tests.findByIdAndDelete(testId);
};

const updateTestComment = async (testId, commentId) => {
    const test = await Tests.findById(testId);
    if (!test) {
        throw new Error("Test not found");
    }
    test.comments.push(commentId);
    await test.save();
    return test;
};

const submitTest = async (userId, testId, lessonsPayload) => {
    // 1) Fetch and validate Test
    const testDoc = await Tests.findById(testId).lean();
    if (!testDoc) {
        throw new Error("Test not found");
    }

    // Extract the array of valid lesson IDs for this test
    const validLessonIds = testDoc.lessonList.map((l) => l.toString());
    const incomingLessonIds = lessonsPayload.map((l) => l.lessonId);

    // 2) Ensure every submitted lessonId belongs to testDoc.lessonList
    for (const lessonId of incomingLessonIds) {
        if (!validLessonIds.includes(lessonId)) {
            throw new Error(`Lesson ${lessonId} is not part of this Test.`);
        }
    }

    // 3) Fetch all these Lessons with their questionsList populated
    const lessonDocs = await Lessons.find({
        _id: { $in: incomingLessonIds },
    })
        .populate("questionsList")
        .lean();

    // Build a map: lessonId → lessonDoc (which includes questionsList)
    const lessonMap = {};
    for (const ld of lessonDocs) {
        lessonMap[ld._id.toString()] = ld;
    }

    let totalQuestions = 0;
    let correctCount = 0;

    // We'll assemble the subdocuments for user.testsTaken
    const lessonsSubdocs = [];

    // 4) Loop over each submitted lesson block
    for (const lessonBlock of lessonsPayload) {
        const { lessonId, questions: submittedQs } = lessonBlock;
        const lessonDoc = lessonMap[lessonId];

        if (!lessonDoc) {
            // Should never happen if we validated above, but just in case
            throw new Error(`Lesson ${lessonId} not found in DB.`);
        }

        // Build a set of valid question IDs for this lesson
        const validQuestionIds = lessonDoc.questionsList.map((q) =>
            q._id.toString()
        );

        // For each submitted question, verify it belongs & compare answer
        const questionSubdocs = [];

        for (const { questionId, selectedAnswer } of submittedQs) {
            if (!validQuestionIds.includes(questionId)) {
                throw new Error(
                    `Question ${questionId} does not belong to Lesson ${lessonId}.`
                );
            }

            // Look up the master Question doc in lessonDoc.questionsList
            const questionDoc = lessonDoc.questionsList.find((q) =>
                q._id.equals(questionId)
            );
            if (!questionDoc) {
                throw new Error(`Question ${questionId} not found in DB.`);
            }

            totalQuestions += 1;
            if (questionDoc.correctAnswer === selectedAnswer) {
                correctCount += 1;
            }

            questionSubdocs.push({
                question: new mongoose.Types.ObjectId(questionId),
                selectedAnswer,
            });
        }

        lessonsSubdocs.push({
            lesson: new mongoose.Types.ObjectId(lessonId),
            questions: questionSubdocs,
        });
    }

    // 5) Compute score as a percentage (you can adjust)
    const score =
        totalQuestions > 0
            ? Math.round((correctCount / totalQuestions) * 100)
            : 0;

    // 6) Build the “testTaken” subdocument
    const testTakenEntry = {
        test: new mongoose.Types.ObjectId(testId),
        score,
        takenAt: new Date(),
        lessons: lessonsSubdocs,
    };

    // 7) Load user, push this entry onto user.testsTaken, and save
    const userDoc = await Users.findById(userId);
    if (!userDoc) {
        throw new Error("User not found");
    }

    userDoc.testsTaken.push(testTakenEntry);
    await userDoc.save();

    // 8) Return summary info
    return { score, totalQuestions, correctCount };
};

const submitWritingTest = async (userId, testId, lessonsPayload) => {
    const testDoc = await Tests.findById(testId).lean();
    if (!testDoc) throw new Error("Test not found");

    // Validate all lessonIds
    const validLessonIds = testDoc.lessonList.map((id) => id.toString());
    for (const lessonBlock of lessonsPayload) {
        if (!validLessonIds.includes(lessonBlock.lessonId.toString())) {
            throw new Error("Lesson not found in this test");
        }
        if (
            !Array.isArray(lessonBlock.selectedAnswer) ||
            lessonBlock.selectedAnswer.length === 0
        ) {
            throw new Error(
                "selectedAnswer array is required and cannot be empty for each lesson"
            );
        }
    }

    const lessonsSubdocs = [];
    const feedbacks = [];
    let totalScore = 0;

    for (const lessonBlock of lessonsPayload) {
        const { lessonId, selectedAnswer } = lessonBlock;
        const questionsSubdocs = [];

        for (const wa of selectedAnswer) {
            const { questionId, answer } = wa;
            const questionDoc = await Questions.findById(questionId).lean();
            if (!questionDoc)
                throw new Error(`Question ${questionId} not found`);

            const aiPrompt = userWritingPrompt(
                questionDoc.question,
                answer,
                questionDoc.correctAnswer || ""
            );

            const aiRaw = await getResponse(aiPrompt);
            let aiResult;
            try {
                aiResult = JSON.parse(aiRaw);
            } catch (err) {
                throw new Error("Failed to parse AI response: " + err.message);
            }

            if (!aiResult || typeof aiResult !== "object") {
                throw new Error("Invalid AI response format");
            }

            const {
                content,
                structure,
                grammar,
                vocabulary,
                suggestions,
                overallScore,
            } = aiResult;

            const numericScore =
                typeof overallScore === "string"
                    ? Number(overallScore)
                    : overallScore;

            if (
                typeof content !== "string" ||
                typeof structure !== "string" ||
                typeof grammar !== "string" ||
                typeof vocabulary !== "string" ||
                typeof suggestions !== "string" ||
                typeof numericScore !== "number" ||
                isNaN(numericScore)
            ) {
                throw new Error("AI response is missing required fields");
            }

            questionsSubdocs.push({
                question: new mongoose.Types.ObjectId(questionId),
                selectedAnswer: answer,
                aiReview: {
                    content,
                    structure,
                    grammar,
                    vocabulary,
                    suggestions,
                    overallScore: numericScore,
                },
            });
            feedbacks.push({
                questionId,
                score: numericScore,
                feedback: {
                    content,
                    structure,
                    grammar,
                    vocabulary,
                    suggestions,
                },
            });
            totalScore += numericScore;
        }

        lessonsSubdocs.push({
            lesson: new mongoose.Types.ObjectId(lessonId),
            questions: questionsSubdocs,
        });
    }

    const testTakenEntry = {
        test: new mongoose.Types.ObjectId(testId),
        score: totalScore,
        takenAt: new Date(),
        lessons: lessonsSubdocs,
    };

    const userDoc = await Users.findById(userId);
    if (!userDoc) {
        throw new Error("User not found");
    }

    userDoc.testsTaken.push(testTakenEntry);
    await userDoc.save();

    return {
        score: totalScore,
        feedbacks,
    };
};

module.exports = {
    getTests,
    getTestById,
    postTest,
    deleteTest,
    updateTestComment,
    submitTest,
    submitWritingTest,
};
