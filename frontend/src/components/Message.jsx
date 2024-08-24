import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Message({ message, openMessage, closeMessage, color }) {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeMessage}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={openMessage}
      autoHideDuration={6000}
      onClose={closeMessage}
      message={message}
      action={action}
      ContentProps={{
        sx: {
          backgroundColor: color, // Set the background color here
        },
      }}
    />
  );
}
