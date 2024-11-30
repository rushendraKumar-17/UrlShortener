import React from 'react';
import { useContext,useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Typography from '@mui/material/Typography';
import {useState} from "react";
import NewQr from "./NewQr.jsx";
import Qrcodes from './Qrcodes';
import Allurls from './Allurls';
import AppContext from '../Context/context.jsx';
import Landing from "./Info.jsx";
// import CreateNew from "./CreateNew.jsx";
import NewUrl from "./NewUrl.jsx";
const Sidebar = () => {
  const drawerWidth = 240;
  const {user} = useContext(AppContext);
  useEffect(()=>{
    console.log(user);
  })
  const [selected,setSelected] = useState("");
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '64px',
            bgcolor: 'white',
            color: 'black',
          }}
        >
          <Typography variant="h6">Shortify</Typography>
        </Box>
        <List>
        <ListItem disablePadding style={{backgroundColor:"blue",color:"white",width:"15vw",borderRadius:"2vw"}}>
            <ListItemButton onClick={()=>{
              setSelected("new");
            }}>
              <ListItemText primary="+"/>

              <ListItemText primary="Create new" />
            </ListItemButton>
          </ListItem>
          {/* Home */}
          <ListItem disablePadding>
            <ListItemButton onClick={()=>{
              setSelected("home");
            }}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          {/* Urls */}
          <ListItem disablePadding>
            <ListItemButton onClick={()=>{
              setSelected("urls");
            }}>
              <ListItemIcon>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText primary="Urls" />
            </ListItemButton>
          </ListItem>

          {/* QR Codes */}
          <ListItem disablePadding>
            <ListItemButton onClick={()=>{
              setSelected("qrcodes");
              console.log("qrcodes");
            }}>
              <ListItemIcon>
                <QrCodeIcon />
              </ListItemIcon>
              <ListItemText primary="QR Codes" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      {/* Main Content Placeholder */}
      <Box
        component="main"
      >

        {selected === "home" && <Landing />}
        {selected === "urls" && <Allurls />}
        {selected === "qrcodes" && <NewQr />}
        {selected === 'new' && <NewUrl />}
      </Box>
    </Box>
  );
};

export default Sidebar;
