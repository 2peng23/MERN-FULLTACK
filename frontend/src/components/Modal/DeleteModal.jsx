import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import { Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #d32f2f",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const buttonStyle = {
  margin: "0 8px",
};

export default function DeleteModal({ open, handleClose, handleDelete }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          <DeleteIcon color="error" /> Confirm Deletion
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography id="modal-modal-description" sx={{ mb: 2 }}>
          Are you sure you want to delete this note? This action cannot be
          undone.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            sx={buttonStyle}
          >
            Delete
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            startIcon={<CancelIcon />}
            sx={buttonStyle}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
