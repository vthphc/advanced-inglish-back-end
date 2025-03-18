const { postReport } = require("../services/rest/reportServices");

const addReport = async (req, res) => {
    try {
        const newReport = await postReport(req.body);
        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addReport,
};
