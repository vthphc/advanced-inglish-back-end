const express = require("express");
const router = express.Router();

const lessonControllers = require("../controllers/lessonControllers");

router.get("/", lessonControllers.retrieveAllLessons);
router.get("/:lessonId", lessonControllers.retrieveLessonById);
router.post("/", lessonControllers.addLesson);
router.delete("/:lessonId", lessonControllers.removeLessonById);
router.post("/:lessonId/comments", lessonControllers.addLessonComment);

module.exports = router;
