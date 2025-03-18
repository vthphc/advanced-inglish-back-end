const Flashcards = require("../../models/flashcard");

const postFlashcard = async ({
    userId,
    topic,
    word,
    definition,
    example,
    category,
    phonetics,
}) => {
    try {
        const flashcard = new Flashcards({
            user: userId,
            topic,
            word,
            definition,
            example,
            category,
            phonetics,
        });
        await flashcard.save();
        return flashcard;
    } catch (error) {
        throw new Error(error);
    }
};

const getFlashcards = async () => {
    try {
        const flashcards = await Flashcards.find();
        return flashcards;
    } catch (error) {
        throw new Error(error);
    }
};

const getFlashcardById = async (id) => {
    try {
        const flashcard = await Flashcards.findById(id);
        return flashcard;
    } catch (error) {
        throw new Error(error);
    }
};

const getAllFlashcardsByUserId = async (userId) => {
    try {
        const flashcards = await Flashcards.find({ user: userId });
        return flashcards;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteFlashcardById = async (id) => {
    try {
        const flashcard = await Flashcards.findByIdAndDelete(id);
        return flashcard;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    postFlashcard,
    getFlashcards,
    getFlashcardById,
    getAllFlashcardsByUserId,
    deleteFlashcardById,
};
