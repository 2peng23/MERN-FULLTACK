import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {
  Grid,
  Paper,
  Pagination,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import DeleteModal from "../../components/Modal/DeleteModal";
import axios from "axios";
import Message from "../../components/Message";
import { UserContext } from "../../../context/userContext";
import EditModal from "../../components/Modal/EditModal";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const NoteInfo = ({ notes }) => {
  // pages & note
  const [page, setPage] = useState(1);
  const [notesPerPage, setNotesPerPage] = useState(20);
  const [tag, setTag] = useState("to do");
  const [allNotes, setAllNotes] = useState(notes);

  // modals
  const [openModal, setOpenModal] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const closeModal = () => setOpenModal(false);
  const closeEditModal = () => setOpenEditModal(false);

  // delete
  const [deleteTrigger, setDeleteTrigger] = useState(0);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  //response
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("gray");

  // user
  const { user } = useContext(UserContext);

  const handleOpenDeleteModal = (id) => {
    setNoteId(id);
    setOpenModal(true);
  };
  const handleOpenEditModal = (id) => {
    setNoteId(id);
    setOpenEditModal(true);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleNotesPerPageChange = (event) => {
    setNotesPerPage(event.target.value);
    setPage(1); // Reset to the first page when items per page change
  };
  const closeMessage = () => {
    setOpenMessage(false);
  };
  const displayedNotes = allNotes.slice(
    (page - 1) * notesPerPage,
    page * notesPerPage
  );
  const fetchNotes = async () => {
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
      setAllNotes(res.data.data);
    } catch (err) {
      nav("/login");
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [deleteTrigger, updateTrigger]);

  // update Note
  const handleUpdate = (data) => {
    axios
      .patch(`note/${noteId}`, data)
      .then((res) => {
        console.log(res);
        setOpenEditModal(false);
        setOpenMessage(true);
        setMessage(res.data.message);
        setUpdateTrigger((prev) => prev + 1); // Update deleteTrigger to re-run useEffect
        setColor("green");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // delete Note
  const handleDelete = async () => {
    await axios
      .delete(`/notes/${noteId}`)
      .then((res) => {
        setOpenModal(false);
        setOpenMessage(true);
        setMessage(res.data.message);
        setDeleteTrigger((prev) => prev + 1); // Update deleteTrigger to re-run useEffect
        setColor("red");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Grid container className="mt-10">
        {displayedNotes &&
          displayedNotes.map((note) => (
            <Grid
              item
              xs={6}
              md={3}
              key={note._id}
              style={{ marginBottom: "10px", padding: "5px" }}
            >
              <Item
                className="flex justify-center align-middle shadow"
                style={{ backgroundColor: "#1876D2", padding: "10px" }}
              >
                <Card
                  variant="outlined"
                  className="w-full"
                  style={{
                    borderRadius: "10px",
                    padding: "10px",
                    height: "400px",
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ height: "80px" }}
                      >
                        {note.title}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        <Button variant="outlined">
                          {note.category_id == "1" && "Work"}
                          {note.category_id == "2" && "Personal"}
                          {note.category_id == "3" && "Study"}
                          {!(
                            note.category_id === "1" ||
                            note.category_id === "2" ||
                            note.category_id === "3"
                          ) && "Not Set"}
                        </Button>
                      </Typography>
                    </Stack>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      style={{
                        maxHeight: "200px",
                        height: "180px",
                        overflow: "auto",
                      }}
                    >
                      {note.content}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box
                    sx={{ p: 2 }}
                    className="flex justify-between align-middle h-1"
                  >
                    <Typography component={"div"}>
                      {/* <Select
                        value={note.tag_id?.toString() || "Not Set"}
                        onChange={(event) => setTag(event.target.value)}
                        style={{ width: "150px", height: "30px" }}
                      >
                        <MenuItem selected={note.tag_id == "1"} value="1">
                          To Do
                        </MenuItem>
                        <MenuItem selected={note.tag_id == "2"} value="2">
                          Reference
                        </MenuItem>
                        <MenuItem selected={note.tag_id == "3"} value="3">
                          Meeting
                        </MenuItem>
                      </Select> */}
                      <Button variant="contained">
                        {note.tag_id == "1" && "To do"}
                        {note.tag_id == "2" && "Reference"}
                        {note.tag_id == "3" && "Meeting"}
                        {!(
                          note.tag_id === "1" ||
                          note.tag_id === "2" ||
                          note.tag_id === "3"
                        ) && "Not Set"}
                      </Button>
                    </Typography>
                    <Typography
                      component={"div"}
                      className="flex justify-between gap-2"
                    >
                      <Tooltip title="Edit Note">
                        <IconButton
                          onClick={() => handleOpenEditModal(note._id)}
                        >
                          <CiEdit
                            style={{ color: "orange", fontSize: "24px" }}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Note">
                        <IconButton
                          onClick={() => handleOpenDeleteModal(note._id)}
                        >
                          <MdDelete
                            style={{ color: "red", fontSize: "24px" }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                  </Box>
                </Card>
              </Item>
            </Grid>
          ))}
      </Grid>
      <Box
        mt={2}
        display="flex"
        justifyContent="end"
        alignItems="end"
        flexDirection="column"
        paddingBottom="20px"
      >
        <Typography component={"div"}>
          <Select
            value={notesPerPage}
            onChange={handleNotesPerPageChange}
            style={{ marginBottom: "10px" }}
          >
            <MenuItem value={20}>20 per page</MenuItem>
            <MenuItem value={50}>50 per page</MenuItem>
            <MenuItem value={100}>100 per page</MenuItem>
            <MenuItem value={1000}>1000 per page</MenuItem>
          </Select>
        </Typography>
        <Pagination
          count={Math.ceil(notes.length / notesPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      {openModal && (
        <DeleteModal
          open={openModal}
          handleClose={closeModal}
          handleDelete={handleDelete}
        />
      )}
      {openEditModal && (
        <EditModal
          open={openEditModal}
          id={noteId}
          handleClose={closeEditModal}
          onSendData={handleUpdate}
        />
      )}
      <Message
        message={message}
        openMessage={openMessage}
        closeMessage={closeMessage}
        color={color}
      />
    </>
  );
};

export default NoteInfo;
