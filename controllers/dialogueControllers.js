const {
    getDialogues,
    getDialogueById,
    postDialogue,
    getDialogueByUserId,
    deleteDialogueById,
} = require("../services/rest/dialogueServices");

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

module.exports = {
    addDialogue,
    retrieveDialogue,
    retrieveAllDialogues,
    retrieveAllDialoguesByUser,
    removeDialogue,
};
