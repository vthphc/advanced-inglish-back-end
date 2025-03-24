const express = require("express");
const router = express.Router();

const transactionControllers = require("../controllers/transactionControllers");

router.get("/", transactionControllers.retrieveAllTransactions);
router.post("/", transactionControllers.addTransaction);
router.get("/:id", transactionControllers.retrieveTransactionById);
router.delete("/:id", transactionControllers.removeTransactionById);

module.exports = router;