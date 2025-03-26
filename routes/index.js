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
const authRoutes = require("./authRoutes");
const completionRoutes = require("./completionRoutes");

router.use("/init", initRoutes);
router.use("/questions", questionRoutes);
router.use("/comments", commentRoutes);
router.use("/flashcards", flashcardRoutes);
router.use("/dialogues", dialogueRoutes);
router.use("/reports", reportRoutes);
router.use("/wallets", walletRoutes);
router.use("/tests", testRoutes);
router.use("/transactions", transactionRoutes);
router.use("/lessons", lessonRoutes);
router.use("/auth", authRoutes);
router.use("/completion", completionRoutes);

module.exports = router;
