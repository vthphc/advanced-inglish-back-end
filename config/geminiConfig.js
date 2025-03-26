const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

const geminiAI = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
});

module.exports = { geminiAI };
