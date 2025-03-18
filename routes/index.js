const express = require("express");
const initRoutes = require("./init");
const questionRoutes = require("./questitonRoutes");
const commentRoutes = require("./commentRoutes");
const flashcardRoutes = require("./flashcardRoutes");
const dialogueRoutes = require("./dialogueRoutes");

const router = express.Router();

router.use("/", {
    initRoutes,
    questionRoutes,
    commentRoutes,
    flashcardRoutes,
    dialogueRoutes,
});

module.exports = router;
