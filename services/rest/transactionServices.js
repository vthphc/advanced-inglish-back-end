const Transactions = require("../../models/transaction");

const getAllTransactions = async () => {
    const transactions = await Transactions.find();
    return transactions;
};

const createTransaction = async ({ amount, senderId }) => {
    const transaction = new Transactions({
        amount,
        sender: senderId,
    });
    await transaction.save();
    return transaction;
};

const getTransactionById = async (id) => {
    const transaction = await Transactions.findById(id);
    return transaction;
};

const deleteTransactionById = async (id) => {
    const transaction = await Transactions.findByIdAndDelete(id);
    return transaction;
};

module.exports = {
    getAllTransactions,
    createTransaction,
    getTransactionById,
    deleteTransactionById,
};
