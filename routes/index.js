const express = require("express");
const router = express.Router();

const initRoutes = require("./init");
const questionRoutes = require("./questitonRoutes");
const commentRoutes = require("./commentRoutes");
const flashcardRoutes = require("./flashcardRoutes");
const dialogueRoutes = require("./dialogueRoutes");
const reportRoutes = require("./reportRoutes");
const walletRoutes = require("./walletRoutes");
const testRoutes = require("./testRoutes");
const transactionRoutes = require("./transactionRoutes");
const lessonRoutes = require("./lessonRoutes");

router.use("/", {
    initRoutes,
    questionRoutes,
    commentRoutes,
    flashcardRoutes,
    dialogueRoutes,
    reportRoutes,
    walletRoutes,
    testRoutes,
    transactionRoutes,
    lessonRoutes,
});

module.exports = router;
