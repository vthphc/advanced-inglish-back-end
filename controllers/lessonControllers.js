const {
    getAllLessons,
    getLessonById,
    postLesson,
    deleteLessonById,
} = require("../services/rest/lessonServices");

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

module.exports = {
    retrieveAllLessons,
    retrieveLessonById,
    addLesson,
    removeLessonById,
};
