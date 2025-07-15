import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordField from "../components/PasswordField";
import GoogleButton from "../components/GoogleButton";
import { useAuth } from "../context/AuthProvider";

export default function Register() {
  const { signUpWithEmail, signInGoogle, loading, error, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    clearError();
    const success = await signUpWithEmail(email, password);
    if (success) navigate("/");
  }

  async function handleGoogleRegister() {
    clearError();
    const success = await signInGoogle();
    if (success) navigate("/");
  }

  return (
    <Box maxWidth={350} mx="auto" mt={10}>
      <Typography variant="h5" mb={2}>
        Регистрация
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleRegister}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <PasswordField
          label="Пароль"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
          Зарегистрироваться
        </Button>
      </form>

      <GoogleButton onClick={handleGoogleRegister} text="Зарегистрироваться" disabled={loading} />
      <Box textAlign="center" mt={2}>
        <Link to="/login">Уже есть аккаунт? Войти</Link>
      </Box>
    </Box>
  );
}
