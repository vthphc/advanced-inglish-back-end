const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    { versionKey: false }
);

module.exports = mongoose.model("Transaction", transactionSchema);
