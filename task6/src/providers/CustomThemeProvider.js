import React, { createContext } from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext(null);

export const CustomThemeProvider = ({ theme, children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      <MUIThemeProvider theme={theme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
