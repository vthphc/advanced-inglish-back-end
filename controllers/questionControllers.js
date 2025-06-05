const {
    getAllQuestions,
    getQuestionById,
    postQuestion,
    putQuestion,
    deleteQuestion,
} = require("../services/rest/questionServices");

const { getResponse } = require("../services/completion/completion");
const { explanationPrompt } = require("../utils/prompts");
const Questions = require("../models/question");

const retrieveQuestions = async (req, res) => {
    try {
        const questions = await getAllQuestions();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const retrieveQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        const question = await getQuestionById(id);
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addQuestion = async (req, res) => {
    const {
        type,
        content,
        audioURL,
        imageURL,
        difficulty,
        question,
        options,
        correctAnswer,
        explanation,
    } = req.body;
    try {
        const newQuestion = await postQuestion(
            type,
            content,
            audioURL,
            imageURL,
            difficulty,
            question,
            options,
            correctAnswer,
            explanation
        );
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editQuestion = async (req, res) => {
    const {
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
    } = req.body;
    try {
        const updatedQuestion = await putQuestion({
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
        });
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteQuestion(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getExplanation = async (req, res) => {
    const { question } = req.body;
    try {
        const prompt = explanationPrompt(question);
        const response = await getResponse(prompt);

        const explanation = response.trim();
        if (!explanation) {
            return res.status(400).json({ error: "No explanation generated." });
        }

        // Update the question with the generated explanation
        const updatedQuestion = await Questions.findByIdAndUpdate(
            question._id,
            { explanation },
            { new: true }
        );

        if (!updatedQuestion) {
            return res.status(404).json({ error: "Question not found." });
        }

        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    retrieveQuestions,
    retrieveQuestion,
    addQuestion,
    editQuestion,
    removeQuestion,
    getExplanation,
};
