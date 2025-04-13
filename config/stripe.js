const stripe = require("stripe");
require("dotenv").config();
const stripeSecretKey = process.env.STRIPE_SECRET_API_KEY;

const stripeClient = stripe(stripeSecretKey, {});

module.exports = { stripeClient };
