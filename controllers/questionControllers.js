const {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
} = require("../services/rest/questions");

const getQuestions = async (req, res) => {
    try {
        const questions = await getAllQuestions();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getQuestion = async (req, res) => {
    try {
        const question = await getQuestionById(req.params);
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addQuestion = async (req, res) => {
    try {
        const newQuestion = await createQuestion(req.body);
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const changeQuestion = async (req, res) => {
    try {
        const updatedQuestion = await updateQuestion(req.body);
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const removeQuestion = async (req, res) => {
    try {
        await deleteQuestion(req.params);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getQuestions,
    getQuestion,
    addQuestion,
    changeQuestion,
    removeQuestion,
};