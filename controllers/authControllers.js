const { sendTestEmail } = require("../services/auth/mailer");
const { loginUser, getMe } = require("../services/auth/login");

const sendEmail = async (req, res) => {
    const { email } = req.body;
    try {
        await sendTestEmail(email);
        res.status(200).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await loginUser(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const me = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const user = await getMe(token);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    sendEmail,
    login,
    me,
};
