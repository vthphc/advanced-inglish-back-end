const express = require("express");
const router = express.Router();

const commentControllers = require("../controllers/commentControllers");

router.post("/comments", commentControllers.addComment);
router.get("/comments/:commentId", commentControllers.getComment);
router.put("/comments", commentControllers.changeComment);
router.put("/comments/like", commentControllers.likeComment);
router.delete("/comments/:commentId", commentControllers.removeComment);

module.exports = router;