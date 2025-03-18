const express = require("express");
const router = express.Router();

const lessonControllers = require("../controllers/lessonControllers");

router.get("/lessons", lessonControllers.getAllLessons);
router.get("/lessons/:lessonId", lessonControllers.getLessonById);
router.post("/lessons", lessonControllers.postLesson);
router.delete("/lessons/:lessonId", lessonControllers.deleteLessonById);

module.exports = router;
