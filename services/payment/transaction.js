const { stripeClient } = require("../../config/stripe");

// Using these models for saving user and transaction data
// to the database if needed in the future:

// const { User } = require("../../models/user");
// const { Transaction } = require("../../models/transaction");


const stripeService = {
    createCheckout: async ({ userId, price }) => {
        // Create a customer with userId as metadata
        const customer = await stripeClient.customers.create({
            metadata: { userId },
        });

        // Only create a subscription session for premium
        const session = await stripeClient.checkout.sessions.create({
            customer: customer.id,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Premium Account Subscription",
                            description: "Subscription for premium account access",
                        },
                        unit_amount: price ? price * 100 : 500, // default $5.00 if not provided
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: "subscription",
            subscription_data: {
                metadata: { userId },
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
