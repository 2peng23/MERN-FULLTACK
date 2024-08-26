const noteService = require("../Service/NoteService");

const createNote = (req, res) => {
  const body = req.body;
  noteService.createNote(body, (error, response) => {
    if (error) {
      return res.status(error.status).json({
        success: 0,
        message: error.message,
        data: null,
      });
    }
    return res.status(200).json({
      success: 1,
      message: "Note created!",
      data: response,
    });
  });
};
const getNotes = (req, res) => {
  noteService.getNotes((error, response) => {
    if (error) {
      return res.status(error.status).json({
        success: 0,
        message: error.message,
        data: null,
      });
    }
    return res.status(200).json({
      success: 1,
      message: "All Notes!",
      data: response,
    });
  });
};
const getUserNotes = (req, res) => {
  const id = req.params.id;
  noteService.getUserNotes(id,(error, response) => {
    if (error) {
      return res.status(error.status).json({
        success: 0,
        message: error.message,
        data: null,
      });
    }
    return res.status(200).json({
      success: 1,
      message: "User Notes!",
      data: response,
    });
  });
};
const getNote = (req, res) => {
  const id = req.params.id;
  noteService.getNote(id,(error, response) => {
    if (error) {
      return res.status(error.status).json({
        success: 0,
        message: error.message,
        data: null,
      });
    }
    return res.status(200).json({
      success: 1,
      message: "Note Data!",
      data: response,
    });
  });
};
const updateNote = (req, res) => {
  const id = req.params.id;
  const data = req.body
  noteService.updateNote(id,data,(error, response) => {
    if (error) {
      return res.status(error.status).json({
        success: 0,
        message: error.message,
        data: null,
      });
    }
    return res.status(200).json({
      success: 1,
      message: "Note Updated!",
      data: response,
    });
  });
};
const deleteNote = (req, res) => {
  const id = req.params.id;
  noteService.deleteNote(id, (error, response) => {
    if (error) {
      return res.status(error.status).json({
        success: 0,
        message: error.message,
        data: null,
      });
    }
    return res.status(200).json({
      success: 1,
      message: "Note Deleted!",
      data: response,
    });
  });
};

module.exports = noteController = {
  createNote,
  getNotes,
  deleteNote,
  getUserNotes,
  getNote,
  updateNote
};
