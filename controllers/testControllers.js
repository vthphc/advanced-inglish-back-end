const {
    getTests,
    getTestById,
    postTest,
    deleteTest,
} = require("../services/rest/testServices");

const retrieveAllTests = async (req, res) => {
    try {
        const tests = await getTests();
        res.status(200).json(tests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const retrieveTestById = async (req, res) => {
    const { testId } = req.params;
    try {
        const test = await getTestById(testId);
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

module.exports = {
    retrieveAllTests,
    retrieveTestById,
    addNewTest,
    removeTest,
};
