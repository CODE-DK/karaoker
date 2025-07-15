import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import SearchField from "../../features/search/components/SearchField";
import { useAuth } from "../../features/auth/context/AuthProvider";
import { Star, StarBorder } from "@mui/icons-material";

interface Props {
  onSearch?: (query: string) => void;
  onInputChange?: (value: string) => void;
}

export function Header({ onSearch, onInputChange }: Props) {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    onInputChange?.(query);
  }, [query, onInputChange]);

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed || !onSearch) return;

    await onSearch(trimmed);

    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleFavoriteClick = () => {
    if (location.pathname === "/favorites") {
      navigate("/");
    } else {
      navigate("/favorites");
    }
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={1}
      sx={{
        bgcolor: (theme) => theme.palette.background.paper,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <ThemeToggleButton />
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Karaoker
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            gap={1}
            flexGrow={1}
            justifyContent="center"
            maxWidth={700}
          >
            <SearchField value={query} onChange={setQuery} onSearch={handleSearch} />

            <Tooltip title={location.pathname === "/favorites" ? "Назад к поиску" : "Избранное"}>
              <IconButton onClick={handleFavoriteClick}>
                {location.pathname === "/favorites" ? <Star color="warning" /> : <StarBorder />}
              </IconButton>
            </Tooltip>
          </Box>

          {user && (
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton onClick={() => navigate("/profile")} sx={{ p: 0 }}>
                <Avatar src={user.photoURL ?? undefined}>
                  {user.photoURL ? null : (user.displayName?.[0]?.toUpperCase() ?? "U")}
                </Avatar>
              </IconButton>
              <Typography
                variant="body2"
                fontWeight={500}
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/profile")}
              >
                {user.displayName || "Профиль"}
              </Typography>
              <Button
                onClick={signOutUser}
                color="secondary"
                variant="outlined"
                size="small"
                sx={{ borderRadius: 2, textTransform: "none" }}
              >
                Выйти
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
