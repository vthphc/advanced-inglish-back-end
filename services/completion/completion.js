const { geminiAI } = require("../../config/geminiConfig");

const getResponse = async (prompt) => {
    const response = await geminiAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt
    });

    return response;
};

module.exports = {
    getResponse,
};
