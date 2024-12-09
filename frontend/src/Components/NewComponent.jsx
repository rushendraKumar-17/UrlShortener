import React from "react";
import NewUrl from "./NewUrl";
import NewQr from "./NewQr";
import { Outlet, useNavigate, Routes, Route } from "react-router-dom";
import { Button, Box, Stack ,Typography} from "@mui/material";
import { useContext } from "react";
import AppContext from "../Context/context";
const NewComponent = () => {
  const navigate = useNavigate();
  const { logged } = useContext(AppContext);
  return (
    <div>
    {logged ? (
    <Box sx={{ padding: "20px", textAlign: "center" }} style={{width:"60vw"}}>
      {/* Buttons Section */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ marginBottom: "20px" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/home/new/newurl");
          }}
          sx={{
            padding: "10px 20px",
            fontWeight: "bold",
            borderRadius: "8px",
            textTransform: "none",
          }}
        >
          New URL
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate("/home/new/newqr");
          }}
          sx={{
            padding: "10px 20px",
            fontWeight: "bold",
            borderRadius: "8px",
            textTransform: "none",
          }}
        >
          New QR
        </Button>
      </Stack>

      {/* Routes Section */}
      <Box sx={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
        <Routes>
          <Route path="/newurl" element={<NewUrl />} />
          <Route path="/newqr" element={<NewQr />} />
        </Routes>
        <Outlet />
      </Box>
    </Box> ) :(
      <Box
      sx={{ padding: "20px", textAlign: "center", marginTop: "20px" }}
      style={{width:"60vw"}}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Please login to continue
      </Typography>
    </Box>
    )
  }
    </div>
  );
};

export default NewComponent;
