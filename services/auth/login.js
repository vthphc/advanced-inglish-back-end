const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        console.log(isPasswordValid);

        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        if (!user.isVerified) {
            console.log("User verification status: ", user.isVerified);
            return {
                isVerified: false,
                userId: user._id,
                message:
                    "Account not verified. Please check your email to verify your account.",
            };
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        return {
            accessToken: token,
            name: user.profile.name,
            userId: user._id,
            isVerified: user.isVerified,
        };
    } catch (error) {
        throw new Error("Internal server error");
    }
};

const getMe = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    return user;
};

module.exports = { loginUser, getMe };
