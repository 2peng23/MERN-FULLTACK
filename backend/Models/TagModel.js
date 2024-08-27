const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlennght: 255,
    },
    color: {
      type: String,
      default: "gray",
      maxlennght: 100,
    },
  },
  {
    timestamps: true,
  }
);

const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
