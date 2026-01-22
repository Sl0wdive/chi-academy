import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const About = () => {
  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          About
        </Typography>

        <Typography variant="body1">
          This application was created as a homework project for task 6.
        </Typography>
      </Paper>
    </Box>
  );
};

export default About;
