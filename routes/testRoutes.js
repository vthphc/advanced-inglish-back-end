const express = require("express");
const router = express.Router();

const testControllers = require("../controllers/testControllers");

router.get("/", testControllers.retrieveAllTests);
router.get("/:testId", testControllers.retrieveTestById);
router.post("/", testControllers.addNewTest);
router.delete("/:testId", testControllers.removeTest);

module.exports = router;