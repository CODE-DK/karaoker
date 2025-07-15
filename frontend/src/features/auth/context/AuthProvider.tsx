import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type Auth,
  type User,
} from "firebase/auth";
import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getErrorMessage } from "../utils/firebaseErrors";
import type { AuthContextType } from "../types";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🟡 Следим за изменениями токена и пользователя
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken(true); // force refresh
          setIdToken(token);
        } catch (e) {
          console.error("🔥 Failed to get ID token:", e);
          setIdToken(null);
        }
      } else {
        setIdToken(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // 🔁 Обновить токен вручную (например, перед каждым fetch)
  const getFreshToken = useCallback(async (): Promise<string | null> => {
    if (!auth.currentUser) return null;
    try {
      const token = await auth.currentUser.getIdToken(true);
      setIdToken(token); // обновляем контекст
      return token;
    } catch (e) {
      console.error("❌ Failed to refresh token:", e);
      return null;
    }
  }, []);

  const withHandling = async (fn: () => Promise<any>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await fn();
      return true;
    } catch (e: any) {
      setError(getErrorMessage(e.code));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = useCallback(
    () => withHandling(() => signInWithPopup(auth, new GoogleAuthProvider())),
    [],
  );

  const signOutUser = useCallback(() => withHandling(() => signOut(auth)), []);

  const signInWithEmail = useCallback(
    (email: string, password: string) =>
      withHandling(() => signInWithEmailAndPassword(auth, email, password)),
    [],
  );

  const signUpWithEmail = useCallback(
    (email: string, password: string) =>
      withHandling(() => createUserWithEmailAndPassword(auth, email, password)),
    [],
  );

  const clearError = () => setError(null);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      error,
      idToken,
      getFreshToken,
      signInGoogle,
      signInWithEmail,
      signUpWithEmail,
      signOutUser,
      clearError,
    }),
    [
      user,
      loading,
      error,
      idToken,
      getFreshToken,
      signInGoogle,
      signInWithEmail,
      signUpWithEmail,
      signOutUser,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
