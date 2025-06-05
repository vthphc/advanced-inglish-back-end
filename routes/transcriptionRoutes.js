const express = require("express");
const router = express.Router();

const transcriptionController = require("../controllers/transcriptionControllers");

router.post("/transcribe", transcriptionController.handleTranscriptionRequest);

module.exports = router;
