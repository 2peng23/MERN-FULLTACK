const { Router } = require("express");
const bookController = require("../Controller/bookController");

const bookRoute = Router();

// Book Routes
bookRoute.get("/books/", bookController.allBoooks);
bookRoute.post("/books/create", bookController.createBook);
bookRoute.get("/books/:title", bookController.getBook);
bookRoute.patch("/books/:title", bookController.updateBook);
bookRoute.delete("/books/:title", bookController.deleteBook);

module.exports = bookRoute;
