const { Router } = require("express");
const noteContoller = require("../Controller/noteContoller");
const noteRoute = Router();

noteRoute.post("/notes", noteContoller.createNote);
noteRoute.get("/notes", noteContoller.getNotes);
noteRoute.delete("/notes/:id", noteContoller.deleteNote);

module.exports = noteRoute;
