const {
    postFlashcard,
    getFlashcards,
    getFlashcardById,
    getAllFlashcardsByUserId,
    deleteFlashcardById,
} = require("../services/rest/flashcardServices");

const addFlashcard = async (req, res) => {
    try {
        const newFlashcard = await postFlashcard(req.body);
        res.status(201).json(newFlashcard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFlashcard = async (req, res) => {
    try {
        const flashcard = await getFlashcardById(req.params.id);
        res.status(200).json(flashcard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllFlashcards = async (req, res) => {
    try {
        const flashcards = await getFlashcards();
        res.status(200).json(flashcards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllFlashcardsByUser = async (req, res) => {
    try {
        const flashcards = await getAllFlashcardsByUserId(req.params.userId);
        res.status(200).json(flashcards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeFlashcard = async (req, res) => {
    try {
        await deleteFlashcardById(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addFlashcard,
    getFlashcard,
    getAllFlashcards,
    getAllFlashcardsByUser,
    removeFlashcard,
};
