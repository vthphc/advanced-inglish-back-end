const express = require("express");
const router = express.Router();

const dialogueControllers = require("../controllers/dialogueControllers");

router.post("/dialogues", dialogueControllers.addDialogue);
router.get("/dialogues/:id", dialogueControllers.getDialogue);
router.get("/dialogues", dialogueControllers.getAllDialogues);
router.get(
    "/dialogues/user/:userId",
    dialogueControllers.getAllDialoguesByUser
);
router.delete("/dialogues/:id", dialogueControllers.removeDialogue);

module.exports = router;
