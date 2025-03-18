const mongoose = require("mongoose");
const logger = require("../utils/logger");

require("dotenv").config();

const dbConfig = {
    url: process.env.MONGO_URI,
};

async function connectToDatabase() {
    mongoose.connect(dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", (error) => {
        logger.error("Database connection error:", error);
    });

    db.once("open", () => {
        logger.info("Database connected");
    });
}

module.exports = connectToDatabase;
