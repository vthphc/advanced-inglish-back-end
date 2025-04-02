require("dotenv").config();

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const User = require("../../models/user");
const { sendEmail } = require("./mailer");

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};

const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString("hex");
};

const registerUser = async (req, res) => {
    const { email, password, name, avatar, dob, gender, bio } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = generateVerificationToken();

        const newUser = new User({
            email,
            password: hashedPassword,
            role: "User",
            profile: {
                name: name || "",
                avatar: avatar || "",
                dob: dob || null,
                gender: gender || "",
                bio: bio || "",
            },
            subscription: {
                status: "free",
                expiresAt: null,
            },
            learningPlan: {
                currentLevel: "",
                targetLevel: "",
                curriculum: [],
            },
            suppportMaterials: {
                dialogues: [],
                flashcards: [],
            },
            testsTaken: [],
            reports: [],
        });

        await newUser.save();

        const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
        await sendEmail(
            email,
            "Verification Email",
            "Please verify your email address",
            `
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
                        <a href="${verificationLink}" class="button">Verify Email</a>
                        <p>If the button doesn't work, copy and paste the following link into your browser:</p>
                        <p><a href="${verificationLink}">${verificationLink}</a></p>
                        <p class="footer">If you did not create an account, no further action is required.</p>
                    </div>
                </body>
                </html>
            `
        );

        const token = generateToken(newUser);

        res.status(201).json({
            token,
            message: "User registered successfully. Please verify your email.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    registerUser,
};
