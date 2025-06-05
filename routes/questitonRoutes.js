const express = require("express");
const router = express.Router();

const questionControllers = require("../controllers/questionControllers");

router.get("/", questionControllers.retrieveQuestions);
router.get("/:questionId", questionControllers.retrieveQuestion);
router.post("/", questionControllers.addQuestion);
router.put("/", questionControllers.editQuestion);
router.delete("/:questionId", questionControllers.removeQuestion);
router.post("/explain", questionControllers.getExplanation);

module.exports = router;
