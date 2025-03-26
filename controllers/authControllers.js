const { sendTestEmail } = require("../services/auth/mailer");

const sendEmail = async (req, res) => {
    const { email } = req.body;
    try {
        await sendTestEmail(email);
        res.status(200).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    sendEmail,
};
