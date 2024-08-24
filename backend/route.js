import { Router } from "express";
import { bookController } from "./Controller/bookController.js";
import { userController } from "./Controller/userController.js";
const route = Router();


// Book Routes
route.get("/books/", bookController.allBoooks);
route.post("/books/create", bookController.createBook);
route.get("/books/:title", bookController.getBook);
route.patch("/books/:title", bookController.updateBook);
route.delete("/books/:title", bookController.deleteBook);

// User Routes
route.post("/user/create", userController.createUser);
route.get("/users", userController.getUsers);

export default route;
