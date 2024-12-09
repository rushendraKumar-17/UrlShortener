import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import LinkIcon from "@mui/icons-material/Link";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { Outlet, useNavigate } from "react-router-dom";
import AppContext from "../Context/context.jsx";
import AddIcon from '@mui/icons-material/Add';
import NewComponent from "./NewComponent.jsx";
const Sidebar = () => {
  const drawerWidth = 240;
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  // Define navigation links
  const navItems = [
    { label: "Create New", icon: <AddIcon/>, path: "/home/new" },
    { label: "Home", icon: <HomeIcon />, path: "/home" },
    { label: "Urls", icon: <LinkIcon />, path: "/home/urls" },
    { label: "QR Codes", icon: <QrCodeIcon />, path: "/home/qrcodes" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "64px",
            bgcolor: "white",
            color: "black",
          }}

        >
          <Typography variant="h6">Shortify</Typography>
        </Box>
        <List>
          {navItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                backgroundColor: window.location.pathname === item.path ? "blue" : "transparent",
                color: window.location.pathname === item.path ? "white" : "black",
                borderRadius: "8px",
                margin: "8px 0",
              }}
            >
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 255, 0.1)",
                  },
                }}
              >
                {item.icon && <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
        }}
        style={{ marginLeft: "2vw",paddingTop:"5vh" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Sidebar;
