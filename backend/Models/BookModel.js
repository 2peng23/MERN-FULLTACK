const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    book_user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
