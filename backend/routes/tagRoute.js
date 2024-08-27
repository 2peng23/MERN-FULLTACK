const TagController = require("../Controller/TagController");
const { Router } = require("express");
const tagRoute = Router();

tagRoute.post("/tags", TagController.createTag);
tagRoute.get("/tags", TagController.getTags);
tagRoute.delete("/tags/:id", TagController.deleteTag);

module.exports = tagRoute;
