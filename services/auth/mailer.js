const nodemailer = require("nodemailer");
require("dotenv").config();

const crypto = require("crypto");

// Note: Should have created a new email account for this purpose (example: inglish-info@gmail.com)
// Note: Should have created an app password for the email account (https://support.google.com/accounts/answer/185833?hl=en)
let transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

//send a test email
const sendTestEmail = async (email) => {
    try {
        let info = await transporter.sendMail({
            to: email,
            subject: "Test Email",
            text: "This is a test email",
            html: "<b>This is a test email</b>",
        });
        console.log("Email sent: " + info.response);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { sendTestEmail };
