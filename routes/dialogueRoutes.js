const express = require("express");
const router = express.Router();

const dialogueControllers = require("../controllers/dialogueControllers");

router.post("/", dialogueControllers.addDialogue);
router.get("/:id", dialogueControllers.retrieveDialogue);
router.get("/", dialogueControllers.retrieveAllDialogues);
router.get("/user/:userId", dialogueControllers.retrieveAllDialoguesByUser);
router.delete("/:id", dialogueControllers.removeDialogue);

module.exports = router;
