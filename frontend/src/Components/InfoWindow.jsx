import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import dayjs from "dayjs";

const InfoWindow = ({ handleClose, item }) => {
  if (!item) return null; // Ensure item is not null or undefined

  return (
    <Dialog
      open={true}
      onClose={() => {
        handleClose("info");
      }}
      //   style={{width:"50vw"}}
      fullWidth
      maxWidth="md"
      aria-labelledby="info-dialog-title"
      aria-describedby="info-dialog-description">
      <DialogTitle id="info-dialog-title">URL Information</DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6">General Details:</Typography>
        <List>
          <ListItem>
            <ListItemText primary="Title" secondary={item.title} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Short URL" secondary={item.shortUrl} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Target URL" secondary={item.targetUrl} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Created At"
              secondary={dayjs(item.createdAt).format("MMMM D, YYYY h:mm A")}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Updated At"
              secondary={dayjs(item.updatedAt).format("MMMM D, YYYY h:mm A")}
            />
          </ListItem>
          {/* <ListItem>
            <ListItemText primary="ID" secondary={item._id} />
          </ListItem> */}
        </List>

        <Typography variant="h6" style={{ marginTop: 16 }}>
          Visit History:
        </Typography>
        {item.visitHistory.length > 0 ? (
          <List>
            {item.visitHistory.map((visit, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Visit ${index + 1}`}
                  secondary={dayjs(visit).format("MMMM D, YYYY h:mm A")}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="textSecondary">No visits recorded.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose("info");
          }}
          color="primary"
          variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoWindow;
