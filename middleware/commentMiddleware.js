const User = require("../models/user");

const transformUserIdsToNames = async (req, res, next) => {
    try {
        // Store the original json method
        const originalJson = res.json;

        // Override the json method
        res.json = async function (data) {
            if (Array.isArray(data)) {
                // If data is an array of comments
                const transformedData = await Promise.all(
                    data.map(async (comment) => {
                        const user = await User.findById(comment.user);
                        return {
                            ...comment.toObject(),
                            user: user ? user.profile.name : "Unknown User",
                        };
                    })
                );
                return originalJson.call(this, transformedData);
            } else if (data && data.comments && Array.isArray(data.comments)) {
                // If data is an object with a comments array
                const transformedComments = await Promise.all(
                    data.comments.map(async (comment) => {
                        const user = await User.findById(comment.user);
                        return {
                            ...comment.toObject(),
                            user: user ? user.profile.name : "Unknown User",
                        };
                    })
                );
                return originalJson.call(this, {
                    ...data,
                    comments: transformedComments,
                });
            }
            // If data is not in the expected format, return as is
            return originalJson.call(this, data);
        };

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    transformUserIdsToNames,
};
