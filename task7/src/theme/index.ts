import { createTheme } from "@mui/material";
import { PaletteMode } from "@mui/material/styles";

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
    },
  });
