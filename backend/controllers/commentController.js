const commentModel = require("../models/commentModel");

const getAllComment = async (req, res) => {
  try {
    const commentList = await commentModel.getAllComment();
    res.json(commentList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { MovieId, UserId, Content, isAnonymous } = req.body;
    const rs = await commentModel.addComment(
      MovieId,
      UserId,
      Content,
      isAnonymous
    );
    res.json(rs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllComment,
  addComment,
};
