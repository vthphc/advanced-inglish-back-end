const { postReport } = require("../services/rest/reportServices");

const addReport = async (req, res) => {
    const { contentId, description, userId } = req.body;
    try {
        const newReport = await postReport(contentId, description, userId);
        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addReport,
};
