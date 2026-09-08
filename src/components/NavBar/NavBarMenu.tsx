import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const NAVIGATION = [
  ["COMMAND CENTRE", "/command-center"],
  ["SALES CONSOLE", "/sales-console"],
  ["MARKET PERFORMANCE", "/market-performance"],
  ["BUILDING BLOCKS", "/building-blocks"],
  ["INVENTORY 360", "/inventory-360"],
] as const;

export function NavBarMenu() {
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: { xs: "flex-start", sm: "center" },
        alignItems: "stretch",
        flex: "1 1 auto",
        minWidth: 0,
        order: { xs: 3, sm: 0 },
        flexBasis: { xs: "100%", sm: "auto" },
        height: { xs: 40, sm: "auto" },
        overflowX: { xs: "auto", sm: "visible" },
      }}
    >
      {NAVIGATION.map(([label, path]) => (
        <Box
          component={NavLink}
          key={path}
          to={path}
          style={({ isActive }) => ({
            color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.8)",
            background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
            boxShadow: isActive ? "inset 0 -3px 0 rgba(255,255,255,0.9)" : "none",
          })}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "0 0 auto",
            px: { xs: 1.25, sm: 1.6, xl: 2 },
            fontSize: { xs: 10, sm: 11, xl: 12 },
            fontWeight: 700,
            letterSpacing: "0.04em",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "all 0.15s ease",
            "&:hover": {
              color: "common.white",
              bgcolor: "rgba(255,255,255,0.08)",
            },
          }}
        >
          {label}
        </Box>
      ))}
    </Box>
  );
}
