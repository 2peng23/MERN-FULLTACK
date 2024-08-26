import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import SearchModule from "../Book/Search";
import Spinner from "../Spinner";
import NoteInfo from "../../pages/notes/Notes";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../context/userContext";
import Message from "../Message";
import CreateModal from "../Modal/CreateModal";

const Notes = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const { user } = useContext(UserContext);
  const nav = useNavigate();

  const fetchNotes = async () => {
    setLoading(true);
    try {
      let role = null;
      let userId = null;

      if (user && user.role !== undefined) {
        // Explicitly check if user.role is defined
        role = user.role;
        userId = user.id;
      } else if (user && user.user_role !== undefined) {
        // Check if user.user_role is defined
        role = user.user_role;
        userId = user._id;
      }
      const userRoute = user && role === 1 ? "/notes" : `/notes/${userId}`;
      const res = await axios.get(userRoute);
      setNotes(res.data.data);
    } catch (err) {
      nav("/login");
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // trigger
  const [createTrigger, setCreateTrigger] = useState(0);

  useEffect(() => {
    fetchNotes();
  }, [user, nav, createTrigger]);

  const handleOpen = (noteId) => {
    const note = notes.find((n) => n._id === noteId);
    setSelectedNote(note);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNote(null);
  };
  //response
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("gray");
  const closeMessage = () => {
    setOpenMessage(false);
  };
  // create
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };
  const closeCreateModal = () => setOpenCreateModal(false);
  // create Note
  const handleCreate = (data) => {
    console.log(data);
    axios
      .post("/notes/", data)
      .then((res) => {
        console.log(res);
        setOpenCreateModal(false);
        setOpenMessage(true);
        setMessage(res.data.message);
        setCreateTrigger((prev) => prev + 1); // Update deleteTrigger to re-run useEffect
        setColor("green");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <div className="flex justify-end items-center py-5">
        <MdOutlineAddBox
          className="text-sky-800 text-4xl"
          onClick={() => handleOpenCreateModal()}
          style={{cursor: "pointer"}}
        />
        {openCreateModal && (
          <CreateModal
            open={openCreateModal}
            handleClose={closeCreateModal}
            onSendData={handleCreate}
          />
        )}
      </div>
      <Message
        message={message}
        openMessage={openMessage}
        closeMessage={closeMessage}
        color={color}
      />
      <SearchModule
        title={notes.length > 1 ? `My Notes` : `My Note`}
        data={notes}
      />

      {loading ? (
        <Spinner />
      ) : (
        <div style={{ height: 600, width: "100%" }}>
          <NoteInfo notes={notes} />
        </div>
      )}
      {/* <BookInfo open={open} onClose={handleClose} book={selectedNote} /> */}
    </div>
  );
};

export default Notes;
