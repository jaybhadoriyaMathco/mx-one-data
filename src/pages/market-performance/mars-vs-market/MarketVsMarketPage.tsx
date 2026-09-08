import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ModuleBreadcrumbs } from "../../../components/common/Breadcrumbs/ModuleBreadcrumbs";

export function MarketVsMarketPage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <ModuleBreadcrumbs />
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}