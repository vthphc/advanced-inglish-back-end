const Dialogues = require("../../models/dialogue");

const getDialogues = async () => {
    return await Dialogues.find();
};

const getDialogueById = async (id) => {
    return await Dialogues.findById(id);
};

const createDialogue = async ({ topic, dialogues }) => {
    return await Dialogues.create({
        topic: topic,
        dialogue: dialogues,
    });
};

const getDialogueByUserId = async (userId) => {
    return await Dialogues.find({ user: userId });
};

const deleteDialogueById = async (id) => {
    return await Dialogues.findByIdAndDelete(id);
};

module.exports = {
    getDialogues,
    getDialogueById,
    createDialogue,
    getDialogueByUserId,
    deleteDialogueById,
};
