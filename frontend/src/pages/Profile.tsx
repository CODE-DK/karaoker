import { useAuth } from "../hooks/useAuth";
import { Layout } from "../components/Layout";
import { Avatar, Typography, Box, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 8,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Avatar
          src={user?.photoURL ?? undefined}
          alt={user?.displayName ?? "Профиль"}
          sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
        >
          {user?.photoURL ? null : user?.displayName?.[0]?.toUpperCase() ?? "U"}
        </Avatar>

        <Typography variant='h6' mt={1}>
          {user?.displayName || "Без имени"}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {user?.email}
        </Typography>
        <Typography variant='caption' display='block' mt={2}>
          UID: {user?.uid}
        </Typography>

        <Button
          onClick={() => navigate("/")}
          variant='outlined'
          fullWidth
          sx={{ mt: 3 }}
        >
          На главную
        </Button>
      </Paper>
    </Layout>
  );
}
