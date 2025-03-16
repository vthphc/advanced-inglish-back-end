const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        type: String,
        content: String, // content for text-based questions or instructions for audio-based questions
        audioURL: String,
        imageURL: String,
        difficulty: String,
        question: String, // question such as "What is the capital of France?"
        options: [String],
        correctAnswer: String,
        explanation: String,
    },
    { versionKey: false }
);

module.exports = mongoose.model("Question", questionSchema);
