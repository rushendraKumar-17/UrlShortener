import axios from 'axios';
import React, { useContext, useEffect,useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Button,
  IconButton
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AppContext from "../Context/context.jsx";
const Qrcodes = () => {
  const [qrs,setQrs] = useState();
  const {logged,apiUrl} = useContext(AppContext);
  const token = localStorage.getItem("token");
  useEffect(()=>{
    // if(!logged) return;
    axios.get(`${apiUrl}/api/qr`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then(res=>{
      console.log(res);
      setQrs(res.data.qrs);
    }).catch(e =>{ console.log(e)});
  },[])
  const handleDownload = (qrCode, title) => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `${title.replace(/\s+/g, "_")}_QR.png`; // Replace spaces in title with underscores
    link.click();
  };
  return (
    <>
      {logged ? (
    <Grid container spacing={2}>
    {qrs && ( qrs.length === 0 ? (
      <h1 style={{textAlign:"center",marginTop:"5vh"}}>No QR available </h1>
    ) :(qrs.map((qr) => (
      <Grid item xs={12} sm={6} md={4} key={qr._id} style={{marginTop:"5vh"}}>
        <Card sx={{ maxWidth: 345 }} style={{padding:"10vh 8vh 0vh 8vh",position:"relative"}}>
          <CardMedia
            component="img"
            height="200"
            image={qr.qrCode}
            alt={`QR Code for ${qr.targetUrl}`}
          />
          <IconButton
              onClick={() => handleDownload(qr.qrCode, qr.title || "QRCode")}
              style={{ position: "absolute" , top: "10px", right: "10px" }}
            >
              <DownloadIcon />
            </IconButton>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {qr.title || "No Title"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Target URL:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <a href={qr.targetUrl} target="_blank" rel="noopener noreferrer">
                {qr.targetUrl}
              </a>
            </Typography>
            {/* <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => handleDownload(qr.qrCode, qr.title || "QRCode")}
            >
              Download
            </Button> */}
            
            
          </CardContent>
        </Card>
      </Grid>
    ))
    ))}
  </Grid>):(
      <Box
      sx={{ padding: "20px", textAlign: "center", marginTop: "20px" }}
      style={{width:"60vw"}}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Please login to view your QR codes
      </Typography>
    </Box>
    )
  }
  </>

  )
}

export default Qrcodes;
