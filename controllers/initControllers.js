const logger = require("../utils/logger");

const Init = require("../models/init");

const getInit = async (req, res) => {
    try {
        const init = await Init.find();
        res.json(init);
        logger.info("Successfully fetched init data");
    } catch (error) {
        logger.error("Error getting init:", error);
        res.status(500).send("Internal server error");
    }
};

module.exports = {
    getInit,
};
