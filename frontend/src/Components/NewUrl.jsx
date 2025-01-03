import React, { useState,useContext } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import AppContext from "../Context/context";
import { useNavigate } from "react-router-dom";
const NewUrl = () => {
  const {apiUrl,setAlertType,setMessage,setOpen} = useContext(AppContext);
  const token = localStorage.getItem("token");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { url, title };
    console.log(data);
    console.log(token);
    axios
      .post(`${apiUrl}/api/url`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setAlertType("success");
          setMessage("Short url generated...");
          setOpen(true);
          setUrl("");
          setTitle("");

          console.log(res.data);
          navigate("/home/urls");
        }
      })
      .catch((e) => {
        console.log(e);
        setAlertType("error");
        setMessage(e.response.data.message);
        setOpen(true);
      });
    
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        textAlign="center"
        sx={{ fontWeight: "bold" }}
      >
        Create a Link
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Destination URL */}
          <TextField
            label="Destination URL"
            variant="outlined"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />

          {/* Title (Optional) */}
          <TextField
            label="Title (Optional)"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ padding: "10px", fontWeight: "bold" }}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default NewUrl;
