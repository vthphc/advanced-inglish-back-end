const Flashcards = require("../../models/flashcard");

const postFlashcard = async (
    userId,
    topic,
    word,
    definition,
    example,
    category,
    phonetics
) => {
    const flashcard = new Flashcards({
        user: userId,
        topic: topic,
        word: word,
        definition: definition,
        example: example,
        category: category,
        phonetics: phonetics,
    });
    await flashcard.save();
    return flashcard;
};

const getFlashcards = async () => {
    const flashcards = await Flashcards.find();
    return flashcards;
};

const getFlashcardById = async (id) => {
    const flashcard = await Flashcards.findById(id);
    return flashcard;
};

const getAllFlashcardsByUserId = async (userId) => {
    const flashcards = await Flashcards.find({ user: userId });
    return flashcards;
};

const deleteFlashcardById = async (id) => {
    const flashcard = await Flashcards.findByIdAndDelete(id);
    return flashcard;
};

module.exports = {
    postFlashcard,
    getFlashcards,
    getFlashcardById,
    getAllFlashcardsByUserId,
    deleteFlashcardById,
};
