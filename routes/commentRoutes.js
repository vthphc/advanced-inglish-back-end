const express = require("express");
const router = express.Router();

const commentControllers = require("../controllers/commentControllers");

router.post("/comments/:commentId", commentControllers.retrieveComment);
router.post("/comments", commentControllers.addComment);
router.put("/comments/:commentId", commentControllers.editComment);
router.put("/comments/:commentId/like", commentControllers.likeComment);
router.delete("/comments/:commentId", commentControllers.removeComment);

module.exports = router;