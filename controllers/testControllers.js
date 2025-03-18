const {
    getTests,
    getTestById,
    createTest,
    deleteTest,
} = require("../services/rest/testServices");

const getAllTests = async (req, res) => {
    try {
        const tests = await getTests();
        res.status(200).json(tests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTestById = async (req, res) => {
    try {
        const test = await getTestById(req.params);
        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addNewTest = async (req, res) => {
    try {
        const newTest = await createTest(req.body);
        res.status(201).json(newTest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeTest = async (req, res) => {
    try {
        await deleteTest(req.params);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTests,
    getTestById,
    addNewTest,
    removeTest,
};
