import { useEffect, useState, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";
import Home from "./Components/Home.jsx";
import AppContext from "./Context/context.jsx";
import Navbar from "./Components/Navbar.jsx";
import { Snackbar } from "@mui/material";
import { Button } from "@mui/material";
import { Alert } from "@mui/material";
function App() {
  const navigate = useNavigate();

  const { open, handleClose, alertType, setAlertType, message } =
    useContext(AppContext);

  return (
    <>
      <Navbar />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ mt: '8vh' }}
      >
        <div>
        <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
          {message}
        </Alert>
        </div>
      </Snackbar>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home/*" element={<Home />} /> {/* Nested routes */}
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
