import { Container } from "@mui/material";
import { Header } from "./Header";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Container maxWidth='md' sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
}
