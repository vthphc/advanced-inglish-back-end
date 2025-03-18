const express = require("express");
const initRoutes = require("./init");
const questionRoutes = require("./questitonRoutes");

const router = express.Router();

router.use("/", {
    initRoutes,
    questionRoutes,
});

module.exports = router;
