const CategoryController = require("../Controller/categoryController");
const { Router } = require("express");
const categoryRoute = Router();

categoryRoute.post("/category", CategoryController.createCategory);
categoryRoute.get("/category", CategoryController.getCategories);
categoryRoute.delete("/category/:id", CategoryController.deleteCategory);

module.exports = categoryRoute;
