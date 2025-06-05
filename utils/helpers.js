const cleanResponse = (response) => {
    // 1. Turn all \" into literal "
    let cleaned = response.replace(/\\"/g, '"');

    // 3. Finally, remove every remaining " character
    cleaned = cleaned.replace(/"/g, "");

    return cleaned;
};

module.exports = {
    cleanResponse,
};
