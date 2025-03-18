const Report = require("../../models/report");

const postReport = async ({ contentId, description, userId }) => {
    const newReport = new Report({
        contentId: contentId,
        description: description,
        userId: userId,
    });
    await newReport.save();

    return newReport;
};

module.exports = {
    postReport,
};
