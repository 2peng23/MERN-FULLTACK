const { Router } = require("express");
const bookController = require("./Controller/bookController.js");
const userController = require("./Controller/userController.js");
const login = require("./auth/login.js");
const logout = require("./auth/logout.js");
const checkToken = require("./helpers/validation.js");
const google = require("./auth/googleAuth.js");

const route = Router();
// auth Routes
route.post("/user/login", login);
route.post("/user/logout", logout);
route.get("/auth/google", google.googleAuth);
route.get("/auth/google/callback", google.googleCallBack);

// Book Routes
route.get("/books/", checkToken, bookController.allBoooks);
route.post("/books/create", bookController.createBook);
route.get("/books/:title", bookController.getBook);
route.patch("/books/:title", bookController.updateBook);
route.delete("/books/:title", bookController.deleteBook);

// User Routes
route.post("/user/create", userController.createUser);
route.get("/users", userController.getUsers);
route.get("/profile", userController.profile);

module.exports = route;
