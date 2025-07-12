import { createContext } from "react";
import type { User } from "firebase/auth";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInGoogle: () => Promise<boolean>;
  signOutUser: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<boolean>;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  idToken: string | null;
  error: string | null;
  clearError: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
