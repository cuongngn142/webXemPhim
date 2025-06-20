const categoryModel = require("../models/categoryModel");

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description)
      return res
        .status(400)
        .json({ error: "Tên và mô tả không được để trống!" });
    const result = await categoryModel.addCategory(name, description);
    res
      .status(201)
      .json({
        message: "Thêm thể loại thành công!",
        CategoryId: result.CategoryId,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name || !description)
      return res
        .status(400)
        .json({ error: "Tên và mô tả không được để trống!" });
    const result = await categoryModel.updateCategory(id, name, description);
    res.json({
      message: "Cập nhật thể loại thành công!",
      changes: result.changes,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await categoryModel.deleteCategory(id);
    res.json({ message: "Xóa thể loại thành công!", changes: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
