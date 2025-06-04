const {
    getAllLessons,
    getLessonById,
    postLesson,
    deleteLessonById,
    updateLessonComment,
} = require("../services/rest/lessonServices");

const { postComment } = require("../services/rest/commentServices");

const retrieveAllLessons = async (req, res) => {
    try {
        const lessons = await getAllLessons();
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const retrieveLessonById = async (req, res) => {
    try {
        const { id } = req.params;
        const lesson = await getLessonById(id);
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addLesson = async (req, res) => {
    try {
        const { topic, title, difficulty, questionsList } = req.body;
        const lesson = await postLesson(
            topic,
            title,
            difficulty,
            questionsList
        );
        res.status(201).json(lesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeLessonById = async (req, res) => {
    try {
        const { id } = req.params;
        const lesson = await deleteLessonById(id);
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addLessonComment = async (req, res) => {
    const { lessonId } = req.params;
    const { content, userId } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }

    try {
        const { _id: commentId } = await postComment(userId, content);
        const lesson = await updateLessonComment(lessonId, commentId);
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    retrieveAllLessons,
    retrieveLessonById,
    addLesson,
    removeLessonById,
    addLessonComment,
};
