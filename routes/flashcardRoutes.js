const express = require("express");
const router = express.Router();

const flashcardControllers = require("../controllers/flashcardControllers");

router.post("/flashcards", flashcardControllers.addFlashcard);
router.get("/flashcards/:id", flashcardControllers.getFlashcard);
router.get("/flashcards", flashcardControllers.getAllFlashcards);
router.get(
    "/flashcards/user/:userId",
    flashcardControllers.getAllFlashcardsByUser
);
router.delete("/flashcards/:id", flashcardControllers.removeFlashcard);

module.exports = router;
