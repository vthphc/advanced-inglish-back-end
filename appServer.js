const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
const connectToDatabase = require("./config/dbConfig");
const cors = require("cors");

const app = express();

require("dotenv").config();

const port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up CORS for all addresses
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        exposedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
        maxAge: 3600,
    })
);

app.use("/api", require("./routes"));

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
