import { Box, Chip, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import KPICard from "../components/common/KPICard/KPICard";
import { ModuleBreadcrumbs } from "../components/common/Breadcrumbs/ModuleBreadcrumbs";
import type { RootState } from "../store";

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

export function MarketExecutiveViewPage() {
  const theme = useTheme();
  const { compareYears, comparePeriods } = useSelector(
    (state: RootState) => state.marketFilters,
  );
  const comparingItems = [...compareYears, ...comparePeriods];

  return (
    <Box sx={pageContainerSx}>
      <ModuleBreadcrumbs />

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          mb: 2.25,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography component="h1" sx={{ m: 0, fontSize: 22, fontWeight: 700, lineHeight: 1.3 }}>
            Executive View
          </Typography>
          <Typography sx={{ mt: 0.75, color: "text.secondary", fontSize: 12 }}>
            Strategic market health summary · All categories · Traditional channel · P08 2026 · RSV ($)
          </Typography>
        </Box>

        {comparingItems.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, pt: 0.5 }}>
            {comparingItems.map((item) => (
              <Chip
                key={item}
                label={`Comparing: ${item}`}
                variant="outlined"
                size="small"
                sx={{
                  height: 28,
                  borderColor: "warning.main",
                  color: "warning.main",
                  bgcolor: "background.paper",
                  fontWeight: 500,
                  borderRadius: 1,
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" },
          gap: 1.75,
        }}
      >
        <KPICard
          label="MARS SOM — TRADITIONAL"
          value="23.1%"
          accentColor={theme.palette.primary.main}
          comparison={{
            status: "positive",
            value: "+0.3pp",
            text: "vs FY25 · Traditional channel · total category",
          }}
        />

        <KPICard
          label="CATEGORY VALUE GROWTH"
          value="+4.1%"
          accentColor={theme.palette.mode === "dark" ? "#E060C0" : "#BC2486"}
          comparison={{ status: "positive", value: "YTD vs FY25" }}
          sparkline={{
            color: theme.palette.mode === "dark" ? "#E060C0" : "#BC2486",
            fill: true,
            data: [3.6, 3.8, 3.9, 3.7, 3.4, 3.8, 4.2, 4.5, 4.4, 4.1],
          }}
        />

        <KPICard
          label="AVG STORES SELLING"
          value="5,329"
          accentColor={theme.palette.warning.main}
          comparison={{ status: "positive", value: "+99 vs P12 2025" }}
          sparkline={{
            color: theme.palette.mode === "dark" ? "#40E8C8" : "#00DCFA",
            fill: true,
            data: [4800, 4920, 5000, 5050, 5100, 5180, 5220, 5260, 5280, 5329],
          }}
        />
      </Box>
    </Box>
  );
}

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

export function MarketShareVolumePage() {
  return <ModuleSummaryPage title="Share & Volume" subtitle="Market share and volume trends by category and channel." />;
}

export function MarketPricingPage() {
  return <ModuleSummaryPage title="Pricing & Price Index" subtitle="Pricing elasticity and index monitoring by channel." />;
}

export function MarketDistributionPage() {
  return <ModuleSummaryPage title="Mars Distribution" subtitle="Distribution coverage, store penetration, and route-to-market insights." />;
}

export function MarketVsMarketPage() {
  return (
    <Box sx={{ width: "100%" }}>
      <ModuleBreadcrumbs />
      <Outlet />
    </Box>
  );
}

export function MarketCategorySkuPage() {
  return <ModuleSummaryPage title="Category & SKU" subtitle="Category-level performance relative to the market." />;
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
