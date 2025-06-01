const Comments = require("../../models/comment");
const Test = require("../../models/test");

const postComment = async (userId, content, testId) => {
	// Create the comment
	const newComment = new Comments({
		user: userId,
		content: content,
	});
	await newComment.save();

	// Add comment reference to the test
	await Test.findByIdAndUpdate(testId, {
		$push: { comments: newComment._id },
	});

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
