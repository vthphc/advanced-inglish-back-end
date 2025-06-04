const Lessons = require("../../models/lesson");

const getAllLessons = async () => {
    const lessons = await Lessons.find();
    return lessons;
};

const getLessonById = async (id) => {
    const lesson = await Lessons.findById(id);
    return lesson;
};

const postLesson = async (topic, title, difficulty, questionsList) => {
    const lesson = new Lessons({
        topic: topic,
        title: title,
        difficulty: difficulty,
        questionsList: questionsList,
    });
    await lesson.save();
    return lesson;
};

const deleteLessonById = async (id) => {
    const lesson = await Lessons.findByIdAndDelete(id);
    return lesson;
};

const updateLessonComment = async (id, commentId) => {
    const lesson = await Lessons.findById(id);
    if (!lesson) {
        throw new Error("Lesson not found");
    }
    lesson.comments.push(commentId);
    await lesson.save();
    return lesson;
};

module.exports = {
    getAllLessons,
    getLessonById,
    postLesson,
    deleteLessonById,
    updateLessonComment,
};
