import { TextField, IconButton, InputAdornment } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

type PasswordFieldProps = TextFieldProps & {
  label?: string;
};

export default function PasswordField(props: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((v) => !v);

  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                onClick={toggleVisibility}
                edge='end'
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
