const {
    postWallet,
    getWalletById,
    getWalletByUserId,
} = require("../services/rest/walletServices");

const addWallet = async (req, res) => {
    const { userId } = req.body;
    try {
        const newWallet = await postWallet(userId);
        res.status(201).json(newWallet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const retrieveWallet = async (req, res) => {
    const { id } = req.params;
    try {
        const wallet = await getWalletById(id);
        res.status(200).json(wallet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const retrieveWalletByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const wallet = await getWalletByUserId(userId);
        res.status(200).json(wallet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addWallet,
    retrieveWallet,
    retrieveWalletByUser,
};
