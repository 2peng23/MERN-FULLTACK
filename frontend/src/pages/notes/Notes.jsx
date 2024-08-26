import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import DeleteModal from "../../components/Modal/DeleteModal";
import axios from "axios";
import Message from "../../components/Message";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const NoteInfo = ({ notes }) => {
  const [page, setPage] = useState(1);
  const [notesPerPage, setNotesPerPage] = useState(20);
  const [tag, setTag] = useState("to do");
  const [allNotes, setAllNotes] = useState(notes);

  const [openModal, setOpenModal] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const [deleteTrigger, setDeleteTrigger] = useState(0);

  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("gray");

  const handleOpenDeleteModal = (id) => {
    setNoteId(id);
    setOpenModal(true);
  };

  const closeModal = () => setOpenModal(false);
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
  const nav = useNavigate()
  useEffect(() => {
    axios
      .get("/notes/")
      .then((res) => {
        setAllNotes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleteTrigger]);

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
              style={{ marginBottom: "10px", padding: "2px" }}
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
                    overflow: "auto",
                    height: "180px",
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {note.title}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        {note.price}
                      </Typography>
                    </Stack>
                    <Typography color="text.secondary" variant="body2">
                      {note.content}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box
                    sx={{ p: 2 }}
                    className="flex justify-between align-middle"
                  >
                    <Typography component={"div"}>
                      <Select
                        value={tag}
                        onChange={(event) => setTag(event.target.value)}
                        style={{ marginBottom: "10px" }}
                      >
                        <MenuItem value={"to do"}>to do</MenuItem>
                        <MenuItem value={"important"}>important</MenuItem>
                        <MenuItem value={"meeting"}>meeting</MenuItem>
                        <MenuItem value={"ideas"}>ideas</MenuItem>
                      </Select>
                    </Typography>
                    <Typography
                      component={"div"}
                      className="flex justify-between gap-2"
                    >
                      <Tooltip title="Edit Note">
                        <IconButton>
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
          id={noteId}
          handleClose={closeModal}
          handleDelete={handleDelete}
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
