const Note = require("../Models/NoteModel");

const createNote = async (body, callBack) => {
  try {
    const { title, content } = body;
    if (!title) {
      return callBack({
        status: 400,
        message: "Title is required!",
      });
    }
    if (!content) {
      return callBack({
        status: 400,
        message: "Content is required!",
      });
    }
    const note = await Note.create({
      title: body.title,
      content: body.content,
      tag_id: body.tag_id,
      category_id: body.category_id,
    });
    console.log(note);
    return callBack(null, note);
  } catch (error) {
    return callBack(error);
  }
};
module.exports = noteService = {
  createNote,
};
