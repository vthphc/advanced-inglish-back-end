const mongoose = require("mongoose");

const dialogueSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        topic: String,
        dialogue: [
            {
                speaker: String, // the speaker such as "A"
                line: String, // the line such as "Hello!"
                audioURL: String, // the link to the audio
            },
        ],
        feedback: {
            type: String,
            default: "", // using AI to generate feedback
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false }
);

module.exports = mongoose.model("Dialogue", dialogueSchema);
