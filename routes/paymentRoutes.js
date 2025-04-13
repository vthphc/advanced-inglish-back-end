const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentControllers");

router.post("/create-checkout-session", paymentController.checkoutController);

module.exports = router;
