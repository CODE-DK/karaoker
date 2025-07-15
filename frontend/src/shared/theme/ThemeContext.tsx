import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import { globalStyles } from "./globalStyles";

type ThemeMode = "light" | "dark";

const ThemeToggleContext = createContext<{ toggleTheme: () => void }>({
  toggleTheme: () => {},
});

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(() => (mode === "light" ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeToggleContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles(theme)} />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
