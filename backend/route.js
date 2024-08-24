import { Router } from "express";
import { bookController } from "./Controller/bookController.js";
const route = Router();


// Book Route
route.get("/", bookController.allBoooks);
route.post("/create", bookController.createBook);
route.get("/:title", bookController.getBook);
route.patch("/:title", bookController.updateBook);
route.delete("/:title", bookController.deleteBook);

export default route;
