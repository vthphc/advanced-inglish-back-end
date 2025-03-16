const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        content: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
        },
        description: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false }
);

module.exports = mongoose.model("Report", reportSchema);
