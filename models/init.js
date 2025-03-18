const mongoose = require("mongoose");

const initSchema = new mongoose.Schema(
    {
        text: String,
    },
    { versionKey: false }
);

module.exports = mongoose.model("Init", initSchema);
