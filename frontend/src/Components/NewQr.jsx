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

const NewQr = () => {
  const [url, setUrl] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState("");
  const token = localStorage.getItem("token");
  const [title,setTitle] = useState("");
  const handleGenerateQRCode = async () => {
    if (url) {
      try {
        axios
          .post(
            "https://urlshortener-p7ma.onrender.com/api/qr",
            { url,title },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            setQrCodeImage(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    }
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: "500px",
        margin: "20px auto",
        padding: "20px",
        textAlign: "center",
        borderRadius: "10px",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        Generate QR Code
      </Typography>
      <Stack spacing={3}>
        {/* Input Field */}
        <TextField
          label="Enter URL"
          variant="outlined"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <TextField
          label="Title(optional)"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Generate Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateQRCode}
          fullWidth
          sx={{ padding: "10px", fontWeight: "bold" }}
        >
          Generate QR Code
        </Button>
      </Stack>

      {qrCodeImage && (
        <Box sx={{ marginTop: "20px", textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
            QR Code:
          </Typography>
          <img
            src={qrCodeImage}
            alt="QR Code"
            style={{
              width: "200px",
              height: "200px",
              border: "2px solid #ccc",
              borderRadius: "10px",
            }}
          />
          
        </Box>
      )}
    </Box>
  );
};

export default NewQr;
