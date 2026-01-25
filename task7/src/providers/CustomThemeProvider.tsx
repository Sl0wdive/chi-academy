import React, { createContext, ReactNode } from "react";
import { ThemeProvider as MUIThemeProvider, Theme } from "@mui/material/styles";

const ThemeContext = createContext<Theme | null>(null);

interface CustomThemeProviderProps {
  theme: Theme;
  children: ReactNode;
}

export const CustomThemeProvider = ({
  theme,
  children,
}: CustomThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={theme}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
