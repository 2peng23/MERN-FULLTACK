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

module.exports = noteController = {
  createNote,
};
