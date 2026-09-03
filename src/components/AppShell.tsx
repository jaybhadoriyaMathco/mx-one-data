import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { NavBar } from "./NavBar";
import GlobalFilters from "./common/Filters/GlobalFilters";

export function AppShell() {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const shouldShowMarketFilters =
    location.pathname.startsWith("/market-performance") ||
    location.pathname.startsWith("/building-blocks");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", bgcolor: "background.default" }}>
      <NavBar user={user} isDark={isDark} toggleTheme={toggleTheme} />
      {shouldShowMarketFilters && <GlobalFilters />}
      <Box
        component="main"
        sx={{
          flex: 1,
          height: 0,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          // px: { xs: 2, sm: 2.5, xl: 2.75 },
          pt: 1.5,
          pb: 2,
          overflow: "hidden",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
