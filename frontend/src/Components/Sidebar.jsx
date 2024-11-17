import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, Drawer, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LinkIcon from "@mui/icons-material/Link";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/home/new" },
    { text: "URLs", icon: <LinkIcon />, path: "/home/urls" },
    { text: "QR Codes", icon: <QrCodeIcon />, path: "/home/qrcodes" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
        },
      }}
    >
     
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}  >
        <Box sx={{ padding: 2, textAlign: "center" }}>
          <Typography variant="h6">My App</Typography>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
