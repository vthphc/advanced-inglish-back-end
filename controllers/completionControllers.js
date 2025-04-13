const { getResponse } = require("../services/completion/completion");

const testing = async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await getResponse(prompt);
        // console.log(response);
        res.status(200).json({
            message: "Success",
            data: response,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    testing,
};
