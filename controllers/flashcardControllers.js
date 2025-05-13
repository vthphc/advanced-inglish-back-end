const {
    postFlashcard,
    getFlashcards,
    getFlashcardById,
    getAllFlashcardsByUserId,
    deleteFlashcardById,
} = require("../services/rest/flashcardServices");

const { getResponse } = require("../services/completion/completion");

const axios = require("axios");

const { flashcardPrompt } = require("../utils/prompts");

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

const generateFlashcard = async (req, res) => {
    const { topic, userId } = req.body;

    if (!topic) {
        return res.status(400).json({ message: "Topic is required" });
    }

    const prompt = flashcardPrompt(topic);

    try {
        const completions = await getResponse(prompt);

        console.log("AI response:", completions);

        let flashcardData;
        try {
            flashcardData = JSON.parse(completions);
        } catch (jsonErr) {
            console.error("Invalid JSON response from AI:", completions);
            return res.status(500).json({
                message: "AI response is not valid JSON",
                error: jsonErr.message,
            });
        }

        const dictionaryApiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${flashcardData.word}`;
        let phonetics = [];

        try {
            const dictionaryResponse = await axios.get(dictionaryApiUrl);
            const dictionaryData = dictionaryResponse.data;

            phonetics =
                dictionaryData[0]?.phonetics?.map((phonetic) => ({
                    text: phonetic.text || null,
                    audio: phonetic.audio || null,
                })) || [];
        } catch (dictionaryErr) {
            console.warn(
                `Failed to fetch pronunciation for word "${flashcardData.word}":`,
                dictionaryErr.message
            );
        }

        flashcardData.createdAt = new Date();
        flashcardData.phonetics = phonetics;

        newFlashcard = await postFlashcard(
            (flashcardData.user = userId),
            flashcardData.topic,
            flashcardData.word,
            flashcardData.definition,
            flashcardData.example,
            flashcardData.category,
            flashcardData.phonetics,
            flashcardData.createdAt
        );

        res.status(201).json(newFlashcard);
    } catch (err) {
        console.error("Error creating flashcard:", err.message);
        res.status(500).json({
            message: "Failed to create flashcard",
            error: err.message,
        });
    }
};

module.exports = {
    addFlashcard,
    retrieveFlashcard,
    retrieveAllFlashcards,
    retrieveAllFlashcardsByUser,
    removeFlashcard,
    generateFlashcard,
};
