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

// send a test email
// using "npm otplib" to generate a random OTP for the email
const sendTestEmail = async (email) => {
    try {
        let info = await transporter.sendMail({
            to: email,
            subject: "Test Email",
            text: "This is a test email",
            // html: "<b>This is a test email</b>",
            html: `
            <!DOCTYPE html>
                <html>
                <head>
                <meta charset="utf-8">
                <title>Account Verification</title>
                <style>
                    body {
                    font-family: Arial, sans-serif;
                    background-color: #f7f7f7;
                    margin: 0;
                    padding: 0;
                    }
                    .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 30px auto;
                    background-color: #ffffff;
                    border: 1px solid #e0e0e0;
                    padding: 20px;
                    text-align: center;
                    }
                    .button {
                    display: inline-block;
                    padding: 12px 20px;
                    margin: 20px 0;
                    background-color: #007BFF;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 4px;
                    font-size: 16px;
                    }
                    .footer {
                    font-size: 12px;
                    color: #999999;
                    margin-top: 20px;
                    }
                </style>
                </head>
                <body>
                <div class="container">
                    <h2>Welcome to Our Service!</h2>
                    <p>Thank you for registering. Please click the button below to verify your email address.</p>
                    <a href="https://example.com/verify?token=YOUR_TOKEN_HERE" class="button">Verify Email</a>
                    <p>If the button doesn't work, copy and paste the following link into your browser:</p>
                    <p><a href="https://example.com/verify?token=YOUR_TOKEN_HERE">https://example.com/verify?token=YOUR_TOKEN_HERE</a></p>
                    <p class="footer">If you did not create an account, no further action is required.</p>
                </div>
                </body>
                </html>`,
        });
        console.log("Email sent: " + info.response);
    } catch (err) {
        console.log(err);
    }
};

const sendEmail = async (email, subject, text, html) => {
    try {
        let info = await transporter.sendMail({
            to: email,
            subject: subject,
            text: text,
            html: html,
        });
        console.log("Email sent: " + info.response);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { sendTestEmail, sendEmail };
