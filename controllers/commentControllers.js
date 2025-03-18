const {
    postComment,
    getCommentById,
    putComment,
    putCommentLike,
    deleteComment,
} = require("../services/rest/commentServices");

const addComment = async (req, res) => {
    const { userId, content } = req.body;
    try {
        const newComment = await postComment(userId, content);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const retrieveComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        const comment = await getCommentById(commentId);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editComment = async (req, res) => {
    const { commentId, content } = req.body;
    try {
        const updatedComment = await putComment(commentId, content);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const likeComment = async (req, res) => {
    const { commentId, userId } = req.body;
    try {
        const updatedComment = await putCommentLike(commentId, userId);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        await deleteComment(commentId);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addComment,
    retrieveComment,
    editComment,
    likeComment,
    removeComment,
};
