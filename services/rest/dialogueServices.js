const Dialogues = require("../../models/dialogue");

const getDialogues = async () => {
    return await Dialogues.find();
};

const getDialogueById = async (id) => {
    return await Dialogues.findById(id);
};

const postDialogue = async (userId, topic, dialogues) => {
    return await Dialogues.create({
        user: userId,
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
    postDialogue,
    getDialogueByUserId,
    deleteDialogueById,
};
