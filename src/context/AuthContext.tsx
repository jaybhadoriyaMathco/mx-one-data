/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY;

type User = {
  name: string;
  role: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);


export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
const [token, setToken] = useState<string | null>(() =>
  sessionStorage.getItem(TOKEN_KEY)
);


  const login = () => {
    const dummyToken = crypto.randomUUID();

    sessionStorage.setItem(
      TOKEN_KEY,
      dummyToken
    );

    setToken(dummyToken);
  };

  console.log("token", token);

    const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      user: token
        ? {
            name: "R. García",
            role: "Category Lead",
          }
        : null,

      token,

      isAuthenticated: !!token,

      login,

      logout,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}