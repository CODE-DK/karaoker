import type { User } from "firebase/auth";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInGoogle: () => Promise<boolean>;
  signOutUser: () => Promise<boolean>;
  signUpWithEmail: (email: string, password: string) => Promise<boolean>;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  idToken: string | null;
  error: string | null;
  clearError: () => void;
};
