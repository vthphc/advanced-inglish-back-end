const express = require("express");
const router = express.Router();

const walletControllers = require("../controllers/walletControllers");

router.post("/wallets", walletControllers.addWallet);
router.get("/wallets/:id", walletControllers.getWallet);
router.get("/wallets/user/:userId", walletControllers.getWalletByUser);

module.exports = router;
