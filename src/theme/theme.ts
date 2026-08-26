import { createTheme } from "@mui/material/styles";
export type ColorMode = "light" | "dark";
export function createAppTheme(mode: ColorMode) {
  const dark = mode === "dark";
  return createTheme({
    palette: {
      mode,
      primary: { main: dark ? "#6060FF" : "#0000A0" },
      background: {
        default: dark ? "#0A0A0F" : "#F8F8F8",
        paper: dark ? "#15151C" : "#FFFFFF",
      },
      text: {
        primary: dark ? "#F4F4F6" : "#0A0A0A",
        secondary: dark ? "#B4B4BE" : "#555555",
      },
      success: { main: dark ? "#40E8C8" : "#00A651" },
      error: { main: dark ? "#FF4D4D" : "#FF1414" },
      warning: { main: dark ? "#FFA040" : "#FF8200" },
      info: { main: dark ? "#8080FF" : "#6060FF" },
      divider: dark ? "rgba(255,255,255,.09)" : "rgba(0,0,0,.08)",
    },
    typography: {
      fontFamily: "'Mars Centra', sans-serif",
      fontSize: 13,
    },
    shape: { borderRadius: 8 },
  });
}
