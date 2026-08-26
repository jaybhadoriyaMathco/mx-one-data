import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { NavBar } from "./NavBar";

export function AppShell() {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <NavBar user={user} isDark={isDark} toggleTheme={toggleTheme} />
      <Box
        component="main"
        sx={{
          minHeight: "calc(100vh - 74px)",
          px: { xs: 2, sm: 4, xl: 5.5 },
          py: { xs: 3, sm: 4.5 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
