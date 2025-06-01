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

const updateProfile = async (req, res) => {
	const userId = req.user.userId;
	const { name, avatar, dob, gender, bio } = req.body;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res
				.status(404)
				.json({ message: "User not found" });
		}

		// Update only the fields that are provided
		if (name !== undefined) user.profile.name = name;
		if (avatar !== undefined) user.profile.avatar = avatar;
		if (dob !== undefined) user.profile.dob = dob;
		if (gender !== undefined) user.profile.gender = gender;
		if (bio !== undefined) user.profile.bio = bio;

		user.updatedAt = new Date();
		await user.save();

		// Return updated user profile without sensitive information
		const updatedProfile = {
			name: user.profile.name,
			avatar: user.profile.avatar,
			dob: user.profile.dob,
			gender: user.profile.gender,
			bio: user.profile.bio,
			email: user.email,
			isVerified: user.isVerified,
			subscription: user.subscription,
			learningPlan: user.learningPlan,
		};

		res.json({
			message: "Profile updated successfully",
			profile: updatedProfile,
		});
	} catch (error) {
		console.error("Error updating profile:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	changePassword,
	updateProfile,
};
