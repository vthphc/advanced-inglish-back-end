const { stripeClient } = require("../../config/stripe");

// Using these models for saving user and transaction data
// to the database if needed in the future:

// const { User } = require("../../models/user");
// const { Transaction } = require("../../models/transaction");

const stripeService = {
    createPremiumSubscriptionCheckout: async (data) => {
        const customer = await stripeClient.customers.create({
            metadata: {
                userId: data.userId,
            },
        });

        const session = await stripeClient.checkout.sessions.create({
            customer: customer.id,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Premium Account Subscription",
                            description:
                                "Subscription for premium account access",
                        },
                        unit_amount: 500, // Amount in cents ($5.00)
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: "subscription",
            subscription_data: {
                metadata: {
                    userId: data.userId,
                },
            },
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL,
        });

        return session.url;
    },
};

module.exports = {
    stripeService,
};
