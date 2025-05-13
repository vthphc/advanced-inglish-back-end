const express = require("express");
const router = express.Router();

const flashcardControllers = require("../controllers/flashcardControllers");

router.post("/", flashcardControllers.addFlashcard);
router.get("/:id", flashcardControllers.retrieveFlashcard);
router.get("/", flashcardControllers.retrieveAllFlashcards);
router.get("/user/:userId", flashcardControllers.retrieveAllFlashcardsByUser);
router.delete("/:id", flashcardControllers.removeFlashcard);
router.post("/generate", flashcardControllers.generateFlashcard);

module.exports = router;
