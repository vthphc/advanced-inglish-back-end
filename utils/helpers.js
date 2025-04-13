const cleanResponse = (response) => {
    return response
        .replace(/[\r\n]+/g, " ")
        .replace(/ +/g, " ")
        .trim();
};

module.exports = {
    cleanResponse,
};
