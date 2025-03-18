const {
    getAllTransactions,
    createTransaction,
    getTransactionById,
    deleteTransactionById,
} = require("../services/rest/transactionServices");

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await getAllTransactions();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTransaction = async (req, res) => {
    try {
        const { amount, senderId } = req.body;
        const transaction = await createTransaction({ amount, senderId });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await getTransactionById(id);
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await deleteTransactionById(id);
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTransactions,
    createTransaction,
    getTransactionById,
    deleteTransactionById,
};
