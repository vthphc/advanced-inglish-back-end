const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/authControllers");
const registerService = require("../services/auth/register");

router.post("/send-email", authControllers.sendEmail);
router.post("/register", registerService.registerUser);
router.put("/verify-email/:verificationToken", registerService.updateUserVerification);

module.exports = router;
