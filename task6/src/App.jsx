import React from "react";
import { ThemeProvider, CssBaseline, Box, IconButton } from "@mui/material";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { getTheme } from "./theme";
import AppRouter from "./router/AppRouter.jsx";
import { CustomThemeProvider } from "./providers/CustomThemeProvider";

const App = () => {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <CustomThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ position: "fixed", top: 155, left: 5 }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Box>
        <AppRouter />
      </BrowserRouter>
    </CustomThemeProvider>
  );
};

export default App;