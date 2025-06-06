const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentControllers");

router.post("/create-checkout-session", paymentController.checkoutController);
router.post("/update-user-and-transaction", paymentController.updateUserAndTransaction);

module.exports = router;
