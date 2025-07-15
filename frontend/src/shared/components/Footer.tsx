import { Box, Container, Typography, useTheme } from "@mui/material";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2,
        px: 2,
        textAlign: "center",
        bgcolor: (theme) => theme.palette.background.paper,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        color: "text.secondary",
        fontSize: 14,
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} <strong>Karaoker</strong>. Все права защищены.
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Проект в разработке — не предназначен для коммерческого использования.
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          По вопросам:{" "}
          <a
            href="mailto:dkom91@gmail.com"
            style={{
              color: theme.palette.text.secondary,
              textDecoration: "underline",
            }}
          >
            dkom91@gmail.com
          </a>
        </Typography>
      </Container>
    </Box>
  );
}
