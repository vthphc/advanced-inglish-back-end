const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
    {
        topic: String,
        title: String,
        difficulty: String,
        questionsList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        score: Number,
    },
    { versionKey: false }
);

module.exports = mongoose.model("Lesson", lessonSchema);
