import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdDelete } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { DataGrid } from "@mui/x-data-grid";
import Spinner from "../Spinner";
import BookInfo from "../Book/BookInfo";
import SearchModule from "../Book/Search";
import { IconButton, Tooltip } from "@mui/material";
import Message from "../Message";
import NoteInfo from "../../pages/notes/Notes";

const Notes = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [deleteTrigger, setDeleteTrigger] = useState(0); // State to trigger useEffect
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // This useEffect will run only on the initial load
    setLoading(true);
    axios
      .get("/notes/")
      .then((res) => {
        setNotes(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []); // Empty dependency array to run only once on mount

  const handleOpen = (bookId) => {
    const note = notes.find((b) => b._id === bookId);
    setSelectedNote(note);
    setOpen(true);
    // await axios
    //   .get(`/books/${bookId}`)
    //   .then((book) => {
    //     setSelectedBook(book.data.message);
    //     setOpen(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setOpen(false);
    //     setSelectedBook(null);
    //   });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNote(null);
  };
  const closeMessage = () => {
    setOpenMessage(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-end items-center py-5">
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      <SearchModule title={notes.length > 1 ? `My Notes ` : `My Note`} data={notes} />

      {loading ? (
        <Spinner />
      ) : (
        <div style={{ height: 600, width: "100%" }}>
          <NoteInfo notes={notes} />
        </div>
      )}
      <BookInfo open={open} onClose={handleClose} book={selectedNote} />
    </div>
  );
};

export default Notes;
