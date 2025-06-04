const { transcribeAudio } = require("../services/transcription/transcriptions");
const { userSpeechPrompt } = require("../utils/prompts");
const { getResponse } = require("../services/completion/completion");

const handleTranscriptionRequest = async (req, res) => {
    const { topic, source } = req.body;

    if (!source) {
        return res
            .status(400)
            .json({ error: "Field 'source' is required in the request body." });
    }

    try {
        const transcriptText = await transcribeAudio(source);

        if (!transcriptText) {
            return res.status(400).json({
                error: "Transcription failed. No text returned from service.",
            });
        }

        const prompt = userSpeechPrompt(topic, transcriptText);
        const rawResponse = await getResponse(prompt);

        if (!rawResponse) {
            return res.status(400).json({
                error: "Failed to generate response from the AI service.",
            });
        }

        // Attempt to parse the AI’s string into an actual object
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(rawResponse);
        } catch (e) {
            // If parsing fails, fall back to returning it as a string
            parsedResponse = rawResponse;
        }

        return res.status(200).json({
            message: "Transcription and response generation successful.",
            data: {
                transcript: transcriptText,
                aiResponse: parsedResponse,
            },
        });
    } catch (err) {
        const msg = err.message || "Unknown error";
        if (/Error fetching|Error reading|Transcription error/.test(msg)) {
            return res.status(400).json({ error: msg });
        }
        return res
            .status(500)
            .json({ error: "Server error during transcription." });
    }
};

module.exports = {
    handleTranscriptionRequest,
};
