const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ error: "Token format is invalid." });
    }

    const token = tokenParts[1];

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .json({ error: "Token is invalid or has expired." });
        }

        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
