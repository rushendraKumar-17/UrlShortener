import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const Landing = () => {
  return (
    <Box
      elevation={3}
      sx={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        textAlign: "center",
        borderRadius: "10px",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        Welcome to Shortify!
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", color: "#555" }}>
        Easily shorten your lengthy URLs with our simple and efficient URL
        shortener. Share your links with ease and keep them organized!
      </Typography>
    </Box>
  );
};

export default Landing;
