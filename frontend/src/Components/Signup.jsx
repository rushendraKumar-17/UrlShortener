/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import AppContext from "../Context/context";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const {apiUrl} = useContext(AppContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && name) {
      axios
        .post(`${apiUrl}/api/users/signup`, {
          uname: name,
          email,
          password,
        })
        .then((res) => {
          if (res.status === 201) {
            alert("Registration successful");
            navigate("/login");
          } else {
            alert(res.response.data.message);
            console.log(res);
          }
        })
        .catch((e) => {
          alert(e.response.data.message);
          console.log(e);
    });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="50vh"
        style={{boxShadow:"0px 0px 4px  black",marginTop:"10vh",padding:"5vh"}}
      >
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Signup
          </Button>
        </form>
        <br />
        Already have an account?<Link to="/login">Login</Link>
      </Box>
    </Container>
  );
};

export default Signup;
