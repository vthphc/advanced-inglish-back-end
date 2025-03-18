const {
    getDialogues,
    getDialogueById,
    createDialogue,
    getDialogueByUserId,
    deleteDialogueById,
} = require("../services/rest/dialogueServices");

const addDialogue = async (req, res) => {
    try {
        const newDialogue = await createDialogue(req.body);
        res.status(201).json(newDialogue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDialogue = async (req, res) => {
    try {
        const dialogue = await getDialogueById(req.params.id);
        res.status(200).json(dialogue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllDialogues = async (req, res) => {
    try {
        const dialogues = await getDialogues();
        res.status(200).json(dialogues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllDialoguesByUser = async (req, res) => {
    try {
        const dialogues = await getDialogueByUserId(req.params.userId);
        res.status(200).json(dialogues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeDialogue = async (req, res) => {
    try {
        await deleteDialogueById(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addDialogue,
    getDialogue,
    getAllDialogues,
    getAllDialoguesByUser,
    removeDialogue,
};
