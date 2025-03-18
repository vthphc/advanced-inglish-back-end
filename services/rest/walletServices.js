const Wallets = require("../../models/wallet");

const postWallet = async ({ userId }) => {
    const newWallet = new Wallets({
        userId: userId,
        balance: 0,
    });
    await newWallet.save();

    return newWallet;
};

const getWalletById = async ({ walletId }) => {
    const wallet = await Wallets.findById(walletId);
    return wallet;
};

const getWalletByUserId = async ({ userId }) => {
    const wallet = await Wallets.findOne({ userId: userId });
    return wallet;
};

module.exports = {
    postWallet,
    getWalletById,
    getWalletByUserId,
};
