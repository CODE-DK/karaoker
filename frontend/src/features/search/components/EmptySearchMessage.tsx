import { Box, Typography } from "@mui/material";

interface Props {
  show: boolean;
  placeholder: boolean;
  notFound: boolean;
}

export default function EmptySearchMessage({ show, placeholder, notFound }: Props) {
  if (!show) return null;

  let message = "";
  if (placeholder) {
    message = "Введите название песни или исполнителя, чтобы начать поиск 🎶";
  } else if (notFound) {
    message = "Ничего не найдено 😔";
  }

  return (
    <Box mt={4} textAlign="center">
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
