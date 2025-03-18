const Questions = require("../../models/question");

const getAllQuestions = async () => {
    const questions = await Questions.find();
    return questions;
};

const getQuestionById = async ({ questionId }) => {
    const question = await Questions.findById(questionId);
    return question;
};

const createQuestion = async ({
    type,
    content,
    audioURL,
    imageURL,
    difficulty,
    question,
    options,
    correctAnswer,
    explanation,
}) => {
    const newQuestion = new Questions({
        type,
        content,
        audioURL,
        imageURL,
        difficulty,
        question,
        options,
        correctAnswer,
        explanation,
    });
    await newQuestion.save();
    return newQuestion;
};

const updateQuestion = async ({
    questionId,
    type,
    content,
    audioURL,
    imageURL,
    difficulty,
    question,
    options,
    correctAnswer,
    explanation,
}) => {
    const updatedQuestion = await Questions.findByIdAndUpdate(
        questionId,
        {
            type,
            content,
            audioURL,
            imageURL,
            difficulty,
            question,
            options,
            correctAnswer,
            explanation,
        },
        { new: true }
    );
    return updatedQuestion;
};

const deleteQuestion = async ({ questionId }) => {
    const deletedQuestion = await Questions.findByIdAndDelete(questionId);
    return deletedQuestion;
};

module.exports = {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
};
