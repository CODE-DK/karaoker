import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export default function Page404() {
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Такой страницы не существует
      </Typography>
      <Button variant="contained" component={Link} to="/" sx={{ mt: 2 }}>
        На главную
      </Button>
    </Box>
  );
}
