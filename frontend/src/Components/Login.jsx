import axios from "axios";
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate,Link } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/users/signin",{email,password}).then(res => {
        if(res.status === 200){
            localStorage.setItem('token',res.data.token);
            navigate("/home");
        }else{
            alert("Invalid credentials..");
        }
    }).catch(e => console.log(e));
  };
  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState(null);
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
      sx={{ maxWidth: 400, margin: 'auto' }}
      style={{marginTop:"10vh"}}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
          onClick={handleSubmit}
        >
          Login
        </Button>
      </form>
      <Typography>Don't have an account? <Link to="/signup">Create one</Link></Typography>
    </Box>
  );
};



export default Login;
