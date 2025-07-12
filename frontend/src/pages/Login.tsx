import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordField from "../components/PasswordField";

export default function Login() {
  const { signInWithEmail, signInGoogle, loading, error, clearError } =
    useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    clearError();
    const success = await signInWithEmail(email, password);
    if (success) navigate("/");
  }

  async function handleGoogleLogin() {
    clearError();
    const success = await signInGoogle();
    if (success) navigate("/");
  }

  return (
    <Box maxWidth={350} mx='auto' mt={10}>
      <Typography variant='h5' mb={2}>
        Вход
      </Typography>
      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleLogin}>
        <TextField
          label='Email'
          type='email'
          fullWidth
          margin='normal'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PasswordField
          label='Пароль'
          type='password'
          fullWidth
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type='submit'
          variant='contained'
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          Войти
        </Button>
      </form>
      <Button
        onSubmit={handleGoogleLogin}
        onClick={signInGoogle}
        variant='outlined'
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        Войти через Google
      </Button>
      <Box textAlign='center' mt={2}>
        <Link to='/register'>Нет аккаунта? Зарегистрироваться</Link>
      </Box>
    </Box>
  );
}
