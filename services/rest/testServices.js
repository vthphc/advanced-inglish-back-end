const Tests = require("../../models/test");

const getTests = async () => {
    const tests = await Tests.find();
    return tests;
};

const getTestById = async (testId) => {
    if (!testId) {
        throw new Error("Test ID is required");
    }

    const test = await Tests.findById(testId)
        .populate("lessonList")
        .populate("comments");

    if (!test) {
        throw new Error("Test not found");
    }
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

module.exports = {
    getTests,
    getTestById,
    postTest,
    deleteTest,
};
