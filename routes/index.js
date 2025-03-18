const express = require("express");
const initRoutes = require("./init");
const questionRoutes = require("./questitonRoutes");
const commentRoutes = require("./commentRoutes");
const flashcardRoutes = require("./flashcardRoutes");
const dialogueRoutes = require("./dialogueRoutes");
const reportRoutes = require("./reportRoutes");

const router = express.Router();

router.use("/", {
    initRoutes,
    questionRoutes,
    commentRoutes,
    flashcardRoutes,
    dialogueRoutes,
    reportRoutes,
});

module.exports = router;
