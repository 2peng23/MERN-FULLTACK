const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100, // Maximum of 100 characters for title
    },
    content: {
      type: String,
      required: true,
      maxlength: 10000, // Maximum of 10000 characters for title
    },
    tag_id: {
      type: String,
      default: null, // Default value of 0
      maxlength: 255, // Maximum of 255 characters for title
    },
    category_id: {
      type: String,
      default: null, // Default value of 0
      maxlength: 255, // Maximum of 255 characters for title
    }
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;
