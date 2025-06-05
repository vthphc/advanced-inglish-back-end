const { sendTestEmail } = require("../services/auth/mailer");
const { loginUser, getMe } = require("../services/auth/login");
const Users = require("../models/user");

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
        const user = await loginUser(email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const me = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const user = await getMe(token);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTakenTest = async (req, res) => {
    const { testId } = req.params;
    const token = req.headers.authorization.split(" ")[1];

    try {
        const user = await getMe(token);
        const takenTest = await Users.findById(user._id)
            .populate({
                path: "testsTaken.test",
                match: { _id: testId },
            })
            .populate({
                path: "testsTaken.lessons.lesson",
                select: "title _id",
            })
            .populate("testsTaken.lessons.questions.question")
            .then((user) =>
                user.testsTaken.find(
                    (test) => test.test && test.test._id.toString() === testId
                )
            );

        if (!takenTest) {
            return res
                .status(404)
                .json({ error: "Test not found in user's taken tests" });
        }

        res.status(200).json({ takenTest });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllTakenTests = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];

    try {
        const user = await getMe(token);
        const takenTests = await Users.findById(user._id)
            .populate({
                path: "testsTaken.test",
                select: "title topic",
            })
            .select("testsTaken");

        res.status(200).json({ takenTests: takenTests.testsTaken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    sendEmail,
    login,
    me,
    getTakenTest,
    getAllTakenTests,
};
