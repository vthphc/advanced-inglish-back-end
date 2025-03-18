const {
    getAllTransactions,
    postTransaction,
    getTransactionById,
    deleteTransactionById,
} = require("../services/rest/transactionServices");

const retrieveAllTransactions = async (req, res) => {
    try {
        const transactions = await getAllTransactions();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addTransaction = async (req, res) => {
    try {
        const { amount, senderId } = req.body;
        const transaction = await postTransaction(amount, senderId);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const retrieveTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await getTransactionById(id);
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await deleteTransactionById(id);
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    retrieveAllTransactions,
    addTransaction,
    retrieveTransactionById,
    removeTransactionById,
};
