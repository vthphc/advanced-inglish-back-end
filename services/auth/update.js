const bcrypt = require("bcrypt");
const User = require("../../models/user");

const changePassword = async (req, res) => {
	const { currentPassword, newPassword } = req.body;
	const userId = req.user.userId; // Assuming user ID is available from auth middleware
	// console.log("req from update.js: ", req);

	try {
		// Find user by ID
		const user = await User.findById(userId);
		if (!user) {
			return res
				.status(404)
				.json({ message: "User not found" });
		}

		// Verify current password
		const isPasswordValid = await bcrypt.compare(
			currentPassword,
			user.password
		);
		if (!isPasswordValid) {
			return res.status(401).json({
				message: "Current password is incorrect",
			});
		}

		// Validate new password
		if (!newPassword || newPassword.length < 6) {
			return res.status(400).json({
				message: "New password must be at least 6 characters long",
			});
		}

		// Hash new password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Update password
		user.password = hashedPassword;
		user.updatedAt = new Date();
		await user.save();

		res.json({ message: "Password updated successfully" });
	} catch (error) {
		console.error("Error changing password:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	changePassword,
};
