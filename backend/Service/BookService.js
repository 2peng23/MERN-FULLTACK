import { Book } from "../Models/BookModel.js";

const allBooks = async (callBack) => {
  try {
    const books = await Book.find();
    return callBack(null, books);
  } catch (error) {
    callBack(error);
  }
};

const createBook = async (body, callBack) => {
  try {
    const createdBooks = await Promise.all(
      body.map((book) => Book.create(book))
    );
    return callBack(null, createdBooks);
  } catch (error) {
    return callBack(error);
  }
};

const getBook = async (id, callBack) => {
  try {
    const book = await Book.findOne({ id });
    console.log(book);
    return callBack(null, book);
  } catch (error) {
    callBack(error);
  }
};
const updateBook = async (title, data, callBack) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { title: title }, //find the book by name
      { $set: data }, //update fields
      { new: true } //return udpated book
    );
    return callBack(null, updatedBook);
  } catch (error) {
    callBack(error);
  }
};
const deleteBook = async (id, callBack) => {
  try {
    const deletedBook = await Book.findOneAndDelete({ id: id });
    return callBack(null, deletedBook);
  } catch (error) {
    callBack(error);
  }
};

export const BookService = {
  createBook,
  allBooks,
  getBook,
  updateBook,
  deleteBook,
};
