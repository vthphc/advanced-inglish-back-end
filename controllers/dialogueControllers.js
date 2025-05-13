const {
    getDialogues,
    getDialogueById,
    postDialogue,
    getDialogueByUserId,
    deleteDialogueById,
} = require("../services/rest/dialogueServices");
const { getResponse } = require("../services/completion/completion");
const { dialoguePrompt } = require("../utils/prompts");

const addDialogue = async (req, res) => {
    const { userId, topic, dialogue } = req.body;
    try {
        const newDialogue = await postDialogue(userId, topic, dialogue);
        res.status(201).json(newDialogue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const retrieveDialogue = async (req, res) => {
    const { id } = req.params;
    try {
        const dialogue = await getDialogueById(id);
        res.status(200).json(dialogue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const retrieveAllDialogues = async (req, res) => {
    try {
        const dialogues = await getDialogues();
        res.status(200).json(dialogues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const retrieveAllDialoguesByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const dialogues = await getDialogueByUserId(userId);
        res.status(200).json(dialogues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeDialogue = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteDialogueById(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const generateDialogue = async (req, res) => {
    const { userId, topic, context } = req.body;
    const prompt = dialoguePrompt(topic, context);

    try {
        const completions = await getResponse(prompt);

        const rawText =
            typeof completions === "string"
                ? completions.trim()
                : completions.toString().trim();

        const dialogues = rawText
            .split("\n") // one entry per line
            .map((line) => line.trim()) // trim each
            .filter((line) => line.startsWith("Person")) // drop any empty or non-dialogue lines
            .map((line) => {
                // split into ["Person A", "Hey there: more text"]
                const [speakerPart, ...rest] = line.split(/:\s*/);

                return {
                    speaker: speakerPart.replace(/^Person\s+/, ""), // "A" or "B"
                    line: rest.join(": ").trim(), // preserve extra colons
                };
            });

        const newDialogue = await postDialogue(userId, topic, dialogues);

        await newDialogue.save();
        res.status(201).json(newDialogue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addDialogue,
    retrieveDialogue,
    retrieveAllDialogues,
    retrieveAllDialoguesByUser,
    removeDialogue,
    generateDialogue,
};
