import { IconButton, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeToggle } from "../theme/ThemeContext";

const ThemeToggleButton = () => {
  const theme = useTheme();
  const { toggleTheme } = useThemeToggle();

  const isDark = theme.palette.mode === "dark";

  return (
    <Tooltip title={isDark ? "Светлая тема" : "Тёмная тема"}>
      <IconButton onClick={toggleTheme} color="inherit">
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;
