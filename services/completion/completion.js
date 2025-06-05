const { geminiAI } = require("../../config/geminiConfig");
const { cleanResponse } = require("../../utils/helpers");

const getResponse = async (prompt) => {
    const response = await geminiAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });

    const mainResponse = response.candidates[0].content.parts[0].text;

    const cleanedResponse = cleanResponse(mainResponse);
    return cleanedResponse;
};

module.exports = {
    getResponse,
};
