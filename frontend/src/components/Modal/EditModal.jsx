import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../context/userContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ open, id, handleClose, onSendData }) {
  const {tags, categories} = React.useContext(UserContext)
  const [note, setNote] = React.useState({
    title: "",
    content: "",
    tag_id: "",
    category_id: "",
  });
  const [data, setData] = React.useState({
    title: "",
    content: "",
    tag_id: "",
    category_id: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`/note/${id}`)
        .then((res) => {
        //   console.log(res);
          const fetchedData = res.data.data;
          setNote(fetchedData);
          setData(fetchedData); // Populate the form with the fetched data
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]); // Adding id as a dependency ensures that the effect runs when id changes

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendData(data);
    // handleClose; // Close the modal after submission
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Note
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={data.title} // Use data.title here
              onChange={(e) => setData({ ...data, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Content"
              variant="outlined"
              multiline
              rows={4}
              value={data.content} // Use data.content here
              onChange={(e) => setData({ ...data, content: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Tag</InputLabel>
              <Select
                value={data.tag_id} // Use data.tag_id here
                onChange={(e) => setData({ ...data, tag_id: e.target.value })}
                label="Tag"
              >
                { tags && tags.map((tag) => <MenuItem value={tag._id} key={tag._id}>{tag.name}</MenuItem>) }
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={data.category_id} // Use data.category_id here
                onChange={(e) =>
                  setData({ ...data, category_id: e.target.value })
                }
                label="Category"
              >
                { categories && categories.map((category) => <MenuItem value={category._id} key={category._id}>{category.name}</MenuItem>) }
              </Select>
            </FormControl>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
