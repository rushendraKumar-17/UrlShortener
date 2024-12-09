import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

const NewUrl = () => {
  const token = localStorage.getItem("token");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { url, title };
    console.log(data);
    console.log(token);
    axios
      .post("https://urlshortener-p7ma.onrender.com/api/url", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setUrl("");
          setTitle("");
          console.log(res.data);
          alert("Your short URL is: " + res.data.shortUrl);
        }
      })
      .catch((e) => console.log(e));
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
