const express = require("express");
const router = express.Router();

const commentControllers = require("../controllers/commentControllers");

router.get("/:commentId", commentControllers.retrieveComment);
router.post("/", commentControllers.addComment);
router.put("/:commentId", commentControllers.editComment);
router.put("/:commentId/like", commentControllers.likeComment);
router.delete("/:commentId", commentControllers.removeComment);

module.exports = router;