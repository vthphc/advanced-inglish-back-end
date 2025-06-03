const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
    {
        topic: String,
        title: String,
        difficulty: String,
        lessonList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lesson",
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
                default: [],
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false }
);

module.exports = mongoose.model("Test", testSchema);
