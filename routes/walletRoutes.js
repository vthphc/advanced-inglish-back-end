const express = require("express");
const router = express.Router();

const walletControllers = require("../controllers/walletControllers");

router.post("/", walletControllers.addWallet);
router.get("/:id", walletControllers.retrieveWallet);
router.get("/user/:userId", walletControllers.retrieveWalletByUser);

module.exports = router;
