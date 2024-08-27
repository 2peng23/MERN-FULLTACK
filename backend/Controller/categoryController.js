const Category = require("../Models/CategoryModel");

const createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;
    if (!name) {
      return res.status(403).json({
        success: 0,
        message: "Category Name required!",
        data: null,
      });
    }
    if (!color) {
      return res.status(403).json({
        success: 0,
        message: "Category Color required!",
        data: null,
      });
    }
    const category = await Category.create({
      name: name,
      color: color,
    });
    return res.status(200).json({
      success: 1,
      message: "Category created!",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: 0,
      message: error.message,
      data: null,
    });
  }
};
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      success: 1,
      message: "All Categories",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: 0,
      message: error.message,
      data: null,
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCategory = await Category.findOneAndDelete({ _id: id });
    if (!deletedCategory) {
      return res.status(404).json({
        success: 0,
        message: "Category not found.",
        data: null,
      });
    }
    return res.status(200).json({
      success: 1,
      message: "Category Deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      success: 0,
      message: error.message,
      data: null,
    });
  }
};
module.exports = categoryController = {
  createCategory,
  deleteCategory,
  getCategories,
};
