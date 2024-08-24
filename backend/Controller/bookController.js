import { BookService } from "../Service/BookService.js";

const allBoooks = (req, res) => {
  BookService.allBooks((error, response) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: error,
      });
    }
    return res.status(200).json({
      success: 1,
      message: response,
    });
  });
};
const createBook = (req, res) => {
  const body = req.body;
  BookService.createBook(body, (error, response) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: error,
      });
    }
    return res.status(200).json({
      success: 1,
      message: response,
    });
  });
};

const getBook = (req, res) => {
  const id = req.params.id;
  BookService.getBook(id, (error, response) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: error,
      });
    }
    return res.status(200).json({
      success: 1,
      message: response,
    });
  });
};

const updateBook = (req, res) => {
  const title = req.params.title;
  const data = req.body;
  BookService.updateBook(title, data, (error, response) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: error,
      });
    }
    return res.status(200).json({
      success: 1,
      message: response,
    });
  });
};
const deleteBook = (req, res) => {
  const id = req.params.id;
  BookService.deleteBook(id, (error, response) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: error,
      });
    }
    return res.status(200).json({
      success: 1,
      message: response,
    });
  });
};

export const bookController = {
  allBoooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
};
