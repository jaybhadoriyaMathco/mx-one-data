/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createAppTheme, type ColorMode } from "../theme/theme";

type ThemeContextValue = {
  mode: ColorMode;
  isDark: boolean;
  toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ColorMode>(() =>
    localStorage.getItem("mx-one-theme") === "dark" ? "dark" : "light",
  );
  useEffect(() => {
    localStorage.setItem("mx-one-theme", mode);
  }, [mode]);
  const value = useMemo(
    () => ({
      mode,
      isDark: mode === "dark",
      toggleTheme: () =>
        setMode((current) => (current === "light" ? "dark" : "light")),
    }),
    [mode],
  );
  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={createAppTheme(mode)}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}

