const {
    getTests,
    getTestById,
    postTest,
    deleteTest,
    updateTestComment,
    submitTest,
    submitWritingTest,
} = require("../services/rest/testServices");

const { postComment } = require("../services/rest/commentServices");

const retrieveAllTests = async (req, res) => {
    try {
        const tests = await getTests();
        res.status(200).json(tests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const retrieveTestById = async (req, res) => {
    const { id } = req.params;
    try {
        const test = await getTestById(id);
        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addNewTest = async (req, res) => {
    const { topic, title, difficulty, lessonList } = req.body;
    try {
        const newTest = await postTest(topic, title, difficulty, lessonList);
        res.status(201).json(newTest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeTest = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteTest(id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addTestComment = async (req, res) => {
    const { testId } = req.params;
    const { content, userId } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }

    try {
        const comment = await postComment(content, userId);
        const updatedTest = await updateTestComment(testId, comment._id);
        res.status(200).json(updatedTest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const submitTestController = async (req, res) => {
    try {
        const { testId } = req.params;
        const { userId, lessons } = req.body;

        if (!userId) {
            return res
                .status(400)
                .json({ error: "userId is required in request body." });
        }
        if (!Array.isArray(lessons) || lessons.length === 0) {
            return res.status(400).json({
                error: "lessons array is required and cannot be empty.",
            });
        }

        const { score, totalQuestions, correctCount } = await submitTest(
            userId,
            testId,
            lessons
        );

        return res.status(200).json({
            message: "Test submitted successfully.",
            score,
            totalQuestions,
            correctCount,
        });
    } catch (error) {
        console.error("Error in submitTestController:", error);
        if (/not found|invalid/i.test(error.message)) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Server error." });
    }
};

const submitWritingTestController = async (req, res) => {
    try {
        const { testId } = req.params;
        const { userId, lessons } = req.body;

        console.log("submitWritingTestController called with:", {
            testId,
            userId,
            lessons,
        });

        if (!userId) {
            return res
                .status(400)
                .json({ error: "userId is required in request body." });
        }
        if (!Array.isArray(lessons) || lessons.length === 0) {
            return res.status(400).json({
                error: "lessons array is required and cannot be empty.",
            });
        }

        const result = await submitWritingTest(userId, testId, lessons);

        return res.status(200).json({
            message: "Writing test submitted successfully.",
            ...result,
        });
    } catch (error) {
        console.error("Error in submitWritingTestController:", error);
        if (/not found|invalid/i.test(error.message)) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Server error." });
    }
};

module.exports = {
    retrieveAllTests,
    retrieveTestById,
    addNewTest,
    removeTest,
    addTestComment,
    submitTestController,
    submitWritingTestController,
};
