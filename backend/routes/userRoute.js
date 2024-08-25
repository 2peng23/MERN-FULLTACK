const { Router } = require("express");
const userController = require("../Controller/userController")
const userRoute = Router();

// User Routes
userRoute.post("/user/create", userController.createUser);
userRoute.get("/users", userController.getUsers);
userRoute.get("/profile", userController.profile);

module.exports = userRoute;
