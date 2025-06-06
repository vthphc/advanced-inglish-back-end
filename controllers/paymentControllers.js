const { stripeService } = require("../services/payment/transaction");

const Transaction = require("../models/transaction");
const User = require("../models/user");

const checkoutController = async (req, res) => {
    const { userId, price } = req.body;
    try {
        const sessionUrl = await stripeService.createCheckout({
            userId,
            price,
        });
        res.status(200).json({ url: sessionUrl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserAndTransaction = async (req, res) => {
    const { userId, price } = req.body;
    try {
        const userModel = require("../models/user");
        const transactionModel = require("../models/transaction");

        const user = await userModel.findById(userId);
        if (user) {
            user.subscription.status = "premium";
            user.subscription.expiresAt = new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days from now
            );
            await user.save();
        }

        const transaction = new transactionModel({
            sender: userId,
            amount: price ? price * 100 : 500, // default $5.00 if not provided
            createdAt: new Date(),
        });

        await transaction.save();

        res.status(200).json({
            message: "Checkout session created successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    checkoutController,
    updateUserAndTransaction,
};
