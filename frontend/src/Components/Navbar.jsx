import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../Context/context';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {setLogged,setUser,user,logged} = useContext(AppContext);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // console.log(user);
  const handleLogout = () => {
    localStorage.removeItem('token');
    handleMenuClose();
    setUser(null);
    setLogged(false);
    navigate('/home');
  }
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="white">
      <Toolbar>
        {/* Application Name */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Shortify
        </Typography>

        {/* Profile Section */}
        {logged ? (
          <Box>
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar alt="Profile" />
            </IconButton>
            <Menu
              style={{ width: '30vw' }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {/* Display User's uname and email */}
              <Typography sx={{ padding: '8px 16px' }}>
                <strong>{user.name}</strong>
              </Typography>
              <Typography sx={{ padding: '0 16px' }}>{user.email}</Typography>
              <MenuItem onClick={handleLogout} style={{ color: 'red' ,textAlign:"center"}}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button>
            <Link to="/login">Login</Link>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
