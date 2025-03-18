const Tests = require("../../models/test");

const getTests = async () => {
    const tests = await Tests.find();
    return tests;
};

const getTestById = async ({ testId }) => {
    const test = await Tests.findById(testId);
    return test;
};

const createTest = async ({ topic, title, difficulty, questionsList }) => {
    const test = new Tests({
        topic: topic,
        title: title,
        difficulty: difficulty,
        questionsList: questionsList,
    });
    await test.save();
    return test;
};

const deleteTest = async ({ testId }) => {
    await Tests.findByIdAndDelete(testId);
};

module.exports = {
    getTests,
    getTestById,
    createTest,
    deleteTest,
};
