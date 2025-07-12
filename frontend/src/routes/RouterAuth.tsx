import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "../hooks/useAuth";

export default function RouterAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to='/login' replace />;
  return children;
}
