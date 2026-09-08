import { Box, Typography } from "@mui/material";

import { ModuleBreadcrumbs } from "../../components/common/Breadcrumbs/ModuleBreadcrumbs";
import { TargetKPICard } from "../../components/common/KPICard/TargetKPICard";
import { StandardTable } from "../../components/common/Tables/StandardTable";
import { TableSegmentedControl } from "../../components/common/TableFilters/TableSegmentedControl";
import { useState } from "react";
import {
  deltaColumns,
  deltaColumnGroups,
  deltaRows,
  skuPerformanceColumns,
  skuPerformanceGroups,
  skuPerformanceRows,
} from "../../utils/tableData";

const pageContainerSx = {
  width: "100%",
  height: "100%",
  minHeight: 0,
  overflow: "auto",
  bgcolor: (theme: any) =>
    theme.palette.mode === "dark"
      ? "background.default"
      : "#FFF7F7",
  color: "text.primary",
  borderRadius: 2,
  p: 2,
};

export function PerformancePage() {
  const [grouping, setGrouping] = useState<"SKU" | "Product Family" | "Brand">("SKU");
  const [cut, setCut] = useState<"By Chain" | "By Nielsen Area">("By Chain");

  return (
    <Box sx={pageContainerSx}>
      {/* Breadcrumb */}
      <ModuleBreadcrumbs />

      {/* Page Header */}
      <Box sx={{ mb: 2.25 }}>
        <Typography
          component="h1"
          sx={{
            m: 0,
            fontSize: 22,
            fontWeight: 700,
            lineHeight: 1.3,
          }}
        >
          Performance
        </Typography>

        <Typography
          sx={{
            mt: 0.75,
            color: "text.secondary",
            fontSize: 12,
          }}
        >
          Performance overview across key building block metrics
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: 1.75,
        }}
      >
        {/* KPI 1 */}
        <TargetKPICard
          label="Perfect Store Compliance"
          value="73%"
          comparison="▲ +1pp vs LP"
          comparisonStatus="positive"
          target="85%"
          variance="-9pp vs target"
          varianceStatus="negative"
          progress={73}
          accentColor="#7C3AED"
        />

        {/* KPI 2 */}
        <TargetKPICard
          label="On-Shelf Availability (OSA)"
          value="78%"
          comparison="▲ +3.6pp vs LP"
          comparisonStatus="positive"
          target="95%"
          variance="-13pp vs target"
          varianceStatus="negative"
          progress={78}
          accentColor="#1E2A78"
        />

        {/* KPI 3 */}
        <TargetKPICard
          label="Cataloguing %"
          value="62%"
          subtitle="Cataloged vs target"
          target="90%"
          variance="-26pp vs target"
          varianceStatus="negative"
          progress={62}
          accentColor="#1E2A78"
        />

        {/* KPI 4 */}
        <TargetKPICard
          label="Sell-In % FACT+OA"
          value="114%"
          subtitle="Delivery incl. open orders"
          target="98%"
          variance="+14pp vs target"
          varianceStatus="positive"
          progress={100}
          accentColor="#00C2D4"
        />

        {/* KPI 5 */}
        <TargetKPICard
          label="Avg ROS"
          value="6.7"
          subtitle="Rate of sale · P05"
          target="7"
          variance="-0.6 vs target"
          varianceStatus="negative"
          progress={96}
          accentColor="#BC2486"
        />

        {/* KPI 6 */}
        <TargetKPICard
          label="Avg Market Share"
          value="16.3%"
          subtitle="Share · P05"
          target="18.2%"
          variance="-2.5pp vs target"
          varianceStatus="negative"
          progress={90}
          accentColor="#76B900"
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <StandardTable
          title="Delta Matrix"
          subtitle="Period-over-period change (Tons) by channel"
          columns={deltaColumns}
          columnGroups={deltaColumnGroups}
          rows={deltaRows}
          maxHeight={440}
          compact
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <StandardTable
          title="SKU Performance Matrix — 4+5CO pollo"
          subtitle={`${cut} · ${grouping} · 4+5CO pollo · P05 2026 · vs LP / vs Target`}
          columns={skuPerformanceColumns}
          columnGroups={skuPerformanceGroups}
          rows={skuPerformanceRows}
          headerActions={
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <TableSegmentedControl
                options={["SKU", "Product Family", "Brand"] as const}
                value={grouping}
                onChange={setGrouping}
              />
              <TableSegmentedControl
                options={["By Chain", "By Nielsen Area"] as const}
                value={cut}
                onChange={setCut}
              />
            </Box>
          }
          maxHeight={460}
          compact
        />
      </Box>
    </Box>
  );
}