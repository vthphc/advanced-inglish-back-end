const {
    postWallet,
    getWalletById,
    getWalletByUserId,
} = require("../services/rest/walletServices");

const addWallet = async (req, res) => {
    try {
        const newWallet = await postWallet(req.body);
        res.status(201).json(newWallet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getWallet = async (req, res) => {
    try {
        const wallet = await getWalletById(req.params);
        res.status(200).json(wallet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getWalletByUser = async (req, res) => {
    try {
        const wallet = await getWalletByUserId(req.params);
        res.status(200).json(wallet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addWallet,
    getWallet,
    getWalletByUser,
};
