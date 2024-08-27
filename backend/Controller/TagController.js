const Tag = require("../Models/TagModel");

const createTag = async (req, res) => {
  try {
    const { name, color } = req.body;
    if (!name) {
      return res.status(403).json({
        success: 0,
        message: "Tag Name required!",
        data: null,
      });
    }
    if (!color) {
      return res.status(403).json({
        success: 0,
        message: "Tag Color required!",
        data: null,
      });
    }
    const tag = await Tag.create({
      name: name,
      color: color,
    });
    return res.status(200).json({
      success: 1,
      message: "Tag created!",
      data: tag,
    });
  } catch (error) {
    return res.status(500).json({
      success: 0,
      message: error.message,
      data: null,
    });
  }
};
const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    return res.status(200).json({
      success: 1,
      message: "All Tags",
      data: tags,
    });
  } catch (error) {
    return res.status(500).json({
      success: 0,
      message: error.message,
      data: null,
    });
  }
};
const deleteTag = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTag = await Tag.findOneAndDelete({ _id: id });
    if (!deletedTag) {
      return res.status(404).json({
        success: 0,
        message: "Tag not found.",
        data: null,
      });
    }
    return res.status(200).json({
      success: 1,
      message: "Tag Deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      success: 0,
      message: error.message,
      data: null,
    });
  }
};
module.exports = TagController = {
  createTag,
  deleteTag,
  getTags,
};
