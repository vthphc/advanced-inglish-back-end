const express = require("express");
const router = express.Router();

const transactionControllers = require("../controllers/transactionControllers");

router.get("/transactions", transactionControllers.getAllTransactions);
router.post("/transactions", transactionControllers.createTransaction);
router.get("/transactions/:id", transactionControllers.getTransactionById);
router.delete("/transactions/:id", transactionControllers.deleteTransactionById);

module.exports = router;