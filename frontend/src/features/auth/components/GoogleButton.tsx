import { Button } from "@mui/material";
import GoogleSvgIcon from "./GoogleSvgIcon";

interface GoogleButtonProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

export default function GoogleButton({ onClick, text, disabled }: GoogleButtonProps) {
  return (
    <Button
      onClick={onClick}
      fullWidth
      variant="outlined"
      startIcon={<GoogleSvgIcon sx={{ fontSize: 22 }} />}
      disabled={disabled}
      sx={{
        mt: 2,
        color: "#5f6368",
        borderColor: "#dadce0",
        textTransform: "none",
        fontWeight: 500,
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "#f7f8f8",
          borderColor: "#dadce0",
        },
      }}
    >
      {text}
    </Button>
  );
}
