const { Router } = require("express");
const  bookController  = require("./Controller/bookController.js");
const  userController  = require("./Controller/userController.js");
const checkToken = require("./helpers/validation.js");

const route = Router();

// Book Routes
route.get("/books/", checkToken, bookController.allBoooks);
route.post("/books/create", bookController.createBook);
route.get("/books/:title", bookController.getBook);
route.patch("/books/:title", bookController.updateBook);
route.delete("/books/:title", bookController.deleteBook);

// User Routes
route.post("/user/create", userController.createUser);
route.post("/user/login", userController.loginUser);
route.post("/user/logout", userController.logout);
route.get("/users", userController.getUsers);
route.get("/profile", userController.profile);

module.exports = route;
