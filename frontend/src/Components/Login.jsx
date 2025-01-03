import axios from "axios";
import React, { useState, useContext } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import AppContext from "../Context/context";
const Login = () => {
  const navigate = useNavigate();
  const { setUser, setLogged, apiUrl, setMessage, setOpen, setAlertType } =
    useContext(AppContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/api/users/signin`, { email, password })
      .then((res) => {
        if (res.status === 200) {
          setAlertType("success");
          setMessage("Login successful..");
          setOpen(true);
          localStorage.setItem("token", res.data.token);
          setUser(res.data.user);
          setLogged(true);
          console.log(res);
          navigate("/home");
        } else {
          alert("Invalid credentials..");
        }
      })
      .catch((e) => {
        setAlertType("error");
        setMessage("Invalid credentials..");
        setOpen(true);
      });
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="50vh"
      padding={3}
      boxShadow={3}
      borderRadius={2}
      sx={{ maxWidth: 400, margin: "auto" }}
      style={{ marginTop: "10vh" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}>
          Login
        </Button>
      </form>
      <Typography>
        Don't have an account? <Link to="/signup">Create one</Link>
      </Typography>
    </Box>
  );
};

export default Login;
