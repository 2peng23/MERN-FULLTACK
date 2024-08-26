const { Router } = require("express");
const noteContoller = require("../Controller/noteContoller");
const noteRoute = Router();

noteRoute.post("/notes", noteContoller.createNote);
noteRoute.get("/notes", noteContoller.getNotes);
noteRoute.get("/notes/:id", noteContoller.getUserNotes);
noteRoute.get("/note/:id", noteContoller.getNote);
noteRoute.patch("/note/:id", noteContoller.updateNote);
noteRoute.delete("/notes/:id", noteContoller.deleteNote);

module.exports = noteRoute;
