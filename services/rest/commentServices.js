const Comments = require("../../models/comment");

const postComment = async (userId, content) => {
    const newComment = new Comments({
        userId: userId,
        content: content,
    });
    await newComment.save();
    return newComment;
};

const getCommentById = async (commentId) => {
    const comment = await Comments.findById(commentId);
    return comment;
};

const getAllCommentsByUserId = async (userId) => {
    const comments = await Comments.find({ userId: userId });
    return comments;
};

const putComment = async (commentId, content) => {
    const updatedComment = await Comments.findByIdAndUpdate(
        commentId,
        {
            content,
        },
        { new: true }
    );
    return updatedComment;
};

const putCommentLike = async (commentId, userId) => {
    const updatedComment = await Comments.findByIdAndUpdate(
        commentId,
        {
            $push: { likes: userId },
        },
        { new: true }
    );
    return updatedComment;
};

const deleteComment = async (commentId) => {
    await Comments.findByIdAndDelete(commentId);
};

module.exports = {
    postComment,
    getCommentById,
    getAllCommentsByUserId,
    putComment,
    putCommentLike,
    deleteComment,
};
