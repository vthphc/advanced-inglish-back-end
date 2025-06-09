const express = require("express");
const router = express.Router();

const testControllers = require("../controllers/testControllers");

router.get("/", testControllers.retrieveAllTests);
router.get("/:testId", testControllers.retrieveTestById);
router.get("/:testId/comments", testControllers.getTestComments);
router.post("/", testControllers.addNewTest);
router.delete("/:testId", testControllers.removeTest);
router.post("/:testId/comments", testControllers.addTestComment);
router.post("/:testId/submit", testControllers.submitTestController);
router.post(
    "/:testId/submitWriting",
    testControllers.submitWritingTestController
);

module.exports = router;
