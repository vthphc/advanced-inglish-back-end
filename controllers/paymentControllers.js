const { stripeService } = require("../services/payment/transaction");

const { User } = require("../models/user");
const { Transaction } = require("../models/transaction");

const checkoutController = async (req, res) => {
    const { userId, ticketAmount, price } = req.body;
    try {
        const sessionUrl = await stripeService.createCheckout({
            userId,
            ticketAmount,
            price,
        });
        res.status(200).json({ url: sessionUrl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    checkoutController,
};
