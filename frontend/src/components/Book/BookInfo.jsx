import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import BookCard from "./BookCard";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 800,
  bgcolor: "background.paper",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px",
  boxShadow: 80,
  p: 4,
};
const closeButtonStyle = {
  position: "absolute",
  top: 8,
  right: 8,
  zIndex: 1, // Ensure the close button is on top of the modal content
  "&:hover": {
    bgcolor: "#1876D2",
    color: "white"
  },
};

const BookInfo = ({ open, onClose, book }) => {
  const modalRef = React.useRef();

  React.useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  if (!book) return null;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style} ref={modalRef} tabIndex={-1}>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={closeButtonStyle}
          >
            <CloseIcon />
          </IconButton>
          <BookCard book={book} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default BookInfo;
