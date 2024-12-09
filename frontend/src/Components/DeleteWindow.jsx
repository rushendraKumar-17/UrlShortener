import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

const DeleteWindow = ({  handleClose, handleDelete, item }) => {
  return (
    <Dialog
      open={true}
      onClose={()=>{
        handleClose("delete");
      }}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography id="delete-dialog-description">
          Are you sure you want to delete the following URL?
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ marginTop: 8 }}
        >
          {item.shortUrl}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{
            handleClose("delete");
        }} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={()=>{
            handleDelete(item._id);
            handleClose("delete")
          }}
          color="error"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteWindow;
