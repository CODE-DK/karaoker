import { Box, Container } from "@mui/material";
import { Header } from "./Header";
import type { ReactNode } from "react";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  onSearch?: (query: string) => void;
  onInputChange?: (value: string) => void;
}

export function Layout({ children, onSearch, onInputChange }: LayoutProps) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bgcolor="background.default">
      <Header onSearch={onSearch} onInputChange={onInputChange} />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
}
