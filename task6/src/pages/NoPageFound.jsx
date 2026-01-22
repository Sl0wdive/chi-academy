import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const NoPageFound = () => {
  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          404 - Page Not Found
        </Typography>
      </Paper>
    </Box>
  );
};

export default NoPageFound;
