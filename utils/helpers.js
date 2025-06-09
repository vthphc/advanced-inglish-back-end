const cleanResponse = (response) => {
    // Remove Markdown code block markers (```json, ``` or ```)
    let cleaned = response.replace(/```json|```/gi, "");
    // Trim whitespace
    cleaned = cleaned.trim();
    return cleaned;
};

module.exports = {
    cleanResponse,
};
