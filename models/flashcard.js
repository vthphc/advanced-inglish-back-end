const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        topic: String,
        word: String, // the word such as "apple"
        definition: String,
        example: String, // optional
        category: String, // noun, verb, adjective, adverb, preposition, conjunction, interjection
        phonetics: [
            {
                text: String, // the pronunciation of the word
                audioURL: String, // the link to the audio file
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false }
);

module.exports = mongoose.model("Flashcard", flashcardSchema);
