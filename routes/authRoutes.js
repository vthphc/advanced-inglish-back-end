const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/authControllers");
const registerService = require("../services/auth/register");
const updateService = require("../services/auth/update");
const authMiddleware = require("../middleware/auth");

router.post("/send-email", authControllers.sendEmail);
router.post("/register", registerService.registerUser);
router.put(
	"/verify-email/:verificationToken",
	registerService.updateUserVerification
);
router.post("/login", authControllers.login);
router.get("/me", authControllers.me);
router.put("/change-password", authMiddleware, updateService.changePassword);
router.put("/profile", authMiddleware, updateService.updateProfile);

module.exports = router;
