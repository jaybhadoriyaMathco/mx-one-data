import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ModuleBreadcrumbs } from "../../../components/common/Breadcrumbs/ModuleBreadcrumbs";

export function MarketOverviewPage() {
  return (
    <Box sx={{ width: "100%" }}>
      <ModuleBreadcrumbs />
      <Outlet />
    </Box>
  );
}