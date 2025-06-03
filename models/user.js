const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: String,
        password: String,
        role: String,
        isVerified: { type: Boolean, default: false },
        verificationToken: String,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        profile: {
            name: String,
            avatar: String,
            dob: Date,
            gender: String,
            bio: String,
        },
        subscription: {
            status: {
                type: String,
                enum: ["free", "premium"],
                default: "free",
            },
            expiresAt: Date,
        },
        learningPlan: {
            currentLevel: String,
            targetLevel: String,
            curriculum: [
                {
                    lesson: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Lesson",
                    },
                    status: String,
                    enum: ["completed", "in-progress", "not-started"],
                    progress: Number,
                    startedAt: { type: Date, default: Date.now },
                    completedAt: Date,
                },
            ],
        },
        suppportMaterials: {
            dialogues: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Dialogue",
                },
            ],
            flashcards: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Flashcard",
                },
            ],
        },
        testsTaken: [
            {
                test: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Test",
                },
                score: Number,
                takenAt: { type: Date, default: Date.now },
                lessons: [
                    {
                        lesson: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Lesson",
                        },
                        questions: [
                            {
                                question: {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: "Question",
                                },
                                selectedAnswer: { type: String, default: null },
                            },
                        ],
                    },
                ],
            },
        ],
        reports: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Report",
            },
        ],
    },
    { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
