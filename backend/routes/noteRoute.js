const { Router } = require("express");
const noteContoller = require("../Controller/noteContoller");
const noteRoute = Router();

noteRoute.post("/notes", noteContoller.createNote);

module.exports = noteRoute;
