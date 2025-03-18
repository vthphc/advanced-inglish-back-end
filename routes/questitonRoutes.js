const express = require("express");
const router = express.Router();

const questionControllers = require("../controllers/questionControllers");

router.get("/questions", questionControllers.getQuestions);
router.get("/questions/:questionId", questionControllers.getQuestion);
router.post("/questions", questionControllers.addQuestion);
router.put("/questions", questionControllers.changeQuestion);
router.delete("/questions/:questionId", questionControllers.removeQuestion);

module.exports = router;