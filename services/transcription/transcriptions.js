const speech = require("@google-cloud/speech");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const client = new speech.SpeechClient({
    keyFilename: path.resolve(
        __dirname,
        "gen-lang-client-0472607483-215ec532744a.json"
    ),
});

async function transcribeAudio(dynamicSource) {
    let audio = {};

    if (dynamicSource.startsWith("gs://")) {
        audio = { uri: dynamicSource };
    } else if (
        dynamicSource.startsWith("http://") ||
        dynamicSource.startsWith("https://")
    ) {
        try {
            const response = await axios.get(dynamicSource, {
                responseType: "arraybuffer",
            });
            const audioBytes = Buffer.from(response.data).toString("base64");
            audio = { content: audioBytes };
        } catch (fetchErr) {
            throw new Error(`Error fetching remote URL: ${fetchErr.message}`);
        }
    } else {
        try {
            const filePath = path.resolve(dynamicSource);
            const fileBytes = fs.readFileSync(filePath);
            const audioContent = fileBytes.toString("base64");
            audio = { content: audioContent };
        } catch (fsErr) {
            throw new Error(`Error reading local file: ${fsErr.message}`);
        }
    }

    const config = {
        model: "latest_short",
        encoding: "MP3",
        sampleRateHertz: 22050,
        audioChannelCount: 2,
        enableWordTimeOffsets: true,
        enableWordConfidence: true,
        languageCode: "en-GB",
    };

    const request = { config, audio };

    try {
        const [operation] = await client.longRunningRecognize(request);
        const [response] = await operation.promise();
        const transcription = response.results
            .map((r) => r.alternatives[0].transcript)
            .join("\n");
        return transcription;
    } catch (err) {
        throw new Error(`Transcription error: ${err.message}`);
    }
}

module.exports = {
    transcribeAudio,
};
