import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

const Layout = () => (
  <Box sx={{ display: "flex", height: "100vh" }}>
    <Sidebar />
    <Box sx={{ flexGrow: 1, p: 2, overflow: "auto" }}>
      <Outlet />
    </Box>
  </Box>
);

export default Layout;