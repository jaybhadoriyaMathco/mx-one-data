import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { NavBar } from "./NavBar";

export function AppShell() {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const isMarketPerformancePage =
    location.pathname === "/market-performance";

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <NavBar user={user} isDark={isDark} toggleTheme={toggleTheme} />

      <Box
        component="main"
        sx={{
          minHeight: "calc(100vh - 74px)",
          px: isMarketPerformancePage
            ? 0
            : { xs: 2, sm: 4, xl: 5.5 },
          py: isMarketPerformancePage
            ? 0
            : { xs: 3, sm: 4.5 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}