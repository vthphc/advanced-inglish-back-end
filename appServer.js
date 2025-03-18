const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
const connectToDatabase = require("./config/dbConfig");

const app = express();

require("dotenv").config();

const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use('/api', require('./routes'))

async function startServer() {
    try {
        await connectToDatabase();

        app.listen(port, () => {
            logger.info(`Server is running on port ${port}`);
        });
    } catch (error) {
        logger.error("Error starting server:", error);
        process.exit(1);
    }
}

module.exports = startServer;
