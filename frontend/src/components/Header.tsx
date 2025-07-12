import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  IconButton,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position='static' color='inherit' elevation={1}>
      <Container maxWidth='lg'>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box display='flex' alignItems='center' gap={1}>
            <MicIcon color='primary' />
            <Typography variant='h6' fontWeight={600}>
              Karaoke Search
            </Typography>
          </Box>

          {user && (
            <Box display='flex' alignItems='center' gap={1}>
              <IconButton onClick={() => navigate("/profile")} sx={{ p: 0 }}>
                <Avatar
                  src={user.photoURL ?? undefined}
                  alt={user.displayName ?? "Профиль"}
                >
                  {user.photoURL
                    ? null
                    : user.displayName?.[0]?.toUpperCase() ?? "U"}
                </Avatar>
              </IconButton>
              <Typography
                variant='body2'
                fontWeight={500}
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/profile")}
              >
                {user.displayName || "Профиль"}
              </Typography>
              <Button
                onClick={signOutUser}
                color='secondary'
                variant='outlined'
                size='small'
                sx={{ borderRadius: 2, textTransform: "none", ml: 1 }}
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
