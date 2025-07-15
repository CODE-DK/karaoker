import type { Theme } from "@mui/material";

export const globalStyles = (theme: Theme) => ({
  "*": {
    boxSizing: "border-box",
  },
  html: {
    scrollBehavior: "smooth",
  },
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "'Inter', sans-serif",
    backgroundColor: theme.palette.background.default,
  },

  "input:focus, textarea:focus, select:focus, button:focus": {
    outline: "none",
    boxShadow: "none",
  },

  "input:-webkit-autofill": {
    boxShadow: "0 0 0px 1000px transparent inset !important",
    WebkitTextFillColor: "inherit",
    transition: "background-color 5000s ease-in-out 0s",
  },

  ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.divider,
  },
  ".MuiOutlinedInput-root.Mui-focused": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "none",
  },
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.divider,
  },
});
