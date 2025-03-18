const {
    postFlashcard,
    getFlashcards,
    getFlashcardById,
    getAllFlashcardsByUserId,
    deleteFlashcardById,
} = require("../services/rest/flashcardServices");

const addFlashcard = async (req, res) => {
    const { userId, topic, word, definition, example, category, phonetics } =
        req.body;
    try {
        const newFlashcard = await postFlashcard(
            userId,
            topic,
            word,
            definition,
            example,
            category,
            phonetics
        );
        res.status(201).json(newFlashcard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const retrieveFlashcard = async (req, res) => {
    const { id } = req.params;
    try {
        const flashcard = await getFlashcardById(id);
        res.status(200).json(flashcard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const retrieveAllFlashcards = async (req, res) => {
    try {
        const flashcards = await getFlashcards();
        res.status(200).json(flashcards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const retrieveAllFlashcardsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const flashcards = await getAllFlashcardsByUserId(userId);
        res.status(200).json(flashcards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeFlashcard = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteFlashcardById(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addFlashcard,
    retrieveFlashcard,
    retrieveAllFlashcards,
    retrieveAllFlashcardsByUser,
    removeFlashcard,
};
