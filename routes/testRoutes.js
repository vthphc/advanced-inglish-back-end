const express = require("express");
const router = express.Router();

const testControllers = require("../controllers/testControllers");

router.get("/tests", testControllers.getAllTests);
router.get("/tests/:testId", testControllers.getTestById);
router.post("/tests", testControllers.addNewTest);
router.delete("/tests/:testId", testControllers.removeTest);

module.exports = router;