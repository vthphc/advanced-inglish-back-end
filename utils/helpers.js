const cleanResponse = (response) => {
    const match = response.match(/\{[\s\S]*\}/);
    return match ? match[0] : response;
};

module.exports = {
    cleanResponse,
};
