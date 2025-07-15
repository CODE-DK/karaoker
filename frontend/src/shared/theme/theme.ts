import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    background: { default: "#f9f9f9" },
  },
  shape: { borderRadius: 12 },
  typography: { fontFamily: "'Inter', sans-serif" },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    background: { default: "#121212" },
  },
  shape: { borderRadius: 12 },
  typography: { fontFamily: "'Inter', sans-serif" },
});
