const express = require("express");
const initRoutes = require("./init");
const questionRoutes = require("./questitonRoutes");
const commentRoutes = require("./commentRoutes");

const router = express.Router();

router.use("/", {
    initRoutes,
    questionRoutes,
    commentRoutes,
});

module.exports = router;
