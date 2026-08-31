import { Box, Paper, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ModuleBreadcrumbs } from "../components/common/Breadcrumbs/ModuleBreadcrumbs";

const pageContainerSx = {
  width: "100%",
  height: "100%",
  minHeight: 0,
  overflow: "auto",
  bgcolor: (t: any) =>
    t.palette.mode === "dark" ? "background.default" : "#FFF7F7",
  color: "text.primary",
  borderRadius: 2,
  p: 2,
};


function ModuleSummaryPage({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box sx={pageContainerSx}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {subtitle}
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography variant="body1" color="text.primary">
          This module section is ready for implementation.
        </Typography>
      </Paper>
    </Box>
  );
}

export function MarketOverviewPage() {
  return (
    <Box sx={{ width: "100%" }}>
      <ModuleBreadcrumbs />
      <Outlet />
    </Box>
  );
}

export function MarketVsMarketPage() {
  return (
    <Box sx={{ width: "100%" }}>
      <ModuleBreadcrumbs />
      <Outlet />
    </Box>
  );
}

export function MarketBrandChannelMixPage() {
  return <ModuleSummaryPage title="Brand & Channel Mix" subtitle="Brand contribution and channel mix across the portfolio." />;
}

export function BuildingBlocksExecutivePage() {
  return <ModuleSummaryPage title="Executive" subtitle="Executive summary for the building blocks module." />;
}

export function BuildingBlocksPerformancePage() {
  return <ModuleSummaryPage title="Performance" subtitle="Core performance comparison and trajectory metrics." />;
}

export function BuildingBlocksFactVsFcstPage() {
  return <ModuleSummaryPage title="FACT vs FCST" subtitle="Variance analysis and forecast accuracy review." />;
}
