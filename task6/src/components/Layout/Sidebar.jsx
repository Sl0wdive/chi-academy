import React from "react";
import { Box, List, ListItemButton, ListItemText, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <Paper
    sx={{
      width: 220,
      height: "100vh",
      borderRadius: 0,
      boxShadow: 2,
    }}
  >
    <List>
      <ListItemButton
        component={Link}
        to="/"
        sx={{
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to="/heroes"
        sx={{
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        <ListItemText primary="Heroes" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to="/about"
        sx={{
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        <ListItemText primary="About" />
      </ListItemButton>
    </List>
  </Paper>
);

export default Sidebar;