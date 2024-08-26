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
      note_userid: body.note_userid,
      tag_id: body.tag_id,
      category_id: body.category_id,
    });
    // const creaetedNote = await Promise.all(
    //   body.map((book) => Note.create(book))
    // );
    // console.log(note);
    return callBack(null, creaetedNote);
  } catch (error) {
    return callBack({
      status: 500,
      message: error.message,
    });
  }
};
const getNotes = async (callBack) => {
  try {
    const notes = await Note.find();
    return callBack(null, notes);
  } catch (error) {
    return callBack({
      status: 500,
      message: error.message,
    });
  }
};
const deleteNote = async (id, callBack) => {
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: id });
    return callBack(null, deletedNote);
  } catch (error) {
    return callBack({
      status: 500,
      message: error.message,
    });
  }
};
module.exports = noteService = {
  createNote,
  getNotes,
  deleteNote,
};
