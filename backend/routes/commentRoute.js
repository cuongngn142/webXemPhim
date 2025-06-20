const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.get("/api/comments", commentController.getAllComment);
router.post("/api/comment", commentController.addComment);

module.exports = router;
