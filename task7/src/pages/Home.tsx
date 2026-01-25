import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Rick and Morty Heroes App!
        </Typography>
      </Paper>
    </Box>
  );
};

export default Home;
