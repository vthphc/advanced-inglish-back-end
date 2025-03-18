const {
    postComment,
    getCommentById,
    putComment,
    putCommentLike,
    deleteComment,
} = require("../services/rest/commentServices");

const addComment = async (req, res) => {
    try {
        const newComment = await postComment(req.body);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getComment = async (req, res) => {
    try {
        const comment = await getCommentById(req.params);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const changeComment = async (req, res) => {
    try {
        const updatedComment = await putComment(req.body);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const likeComment = async (req, res) => {
    try {
        const updatedComment = await putCommentLike(req.body);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeComment = async (req, res) => {
    try {
        await deleteComment(req.params);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addComment,
    getComment,
    changeComment,
    likeComment,
    removeComment,
};
