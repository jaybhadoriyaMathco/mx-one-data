import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import KPICard from "../../components/common/KPICard/KPICard";
import { ModuleBreadcrumbs } from "../../components/common/Breadcrumbs/ModuleBreadcrumbs";
import { MultiLineChart } from "../../components/common/Charts/MultiLineChart";
import { StandardTable } from "../../components/common/Tables/StandardTable";
import { TableSegmentedControl } from "../../components/common/TableFilters/TableSegmentedControl";
import {
  priceTrendXAxisData,
  priceTrendSeries,
} from "../../utils/constants";
import {
  averagePriceColumns,
  averagePriceRows,
  factVsFcstChannelColumns,
  factVsFcstChannelRows,
  factVsFcstPeriodColumns,
  factVsFcstPeriodRows,
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

export function FactVsFcstPage() {
  const theme = useTheme();
  const [pivotView, setPivotView] = useState<"Channel" | "Technology" | "Growth" | "Yearly Growth" | "Period Trend">("Channel");
  const [factValue, setFactValue] = useState<"RSV" | "NSV" | "Tons">("RSV");
  const [factCut, setFactCut] = useState<"Channel" | "Customer" | "Technology" | "Period">("Channel");
  const [priceCut, setPriceCut] = useState<"Manufacturer" | "Product" | "Warehouse" | "Customer" | "Brand" | "Area" | "Route">("Product");

  return (
    <Box sx={pageContainerSx}>
      {/* Breadcrumb */}
      <ModuleBreadcrumbs />

      {/* Page Header */}
      <Box
        sx={{
          mb: 2.25,
        }}
      >
        <Typography
          component="h1"
          sx={{
            m: 0,
            fontSize: 22,
            fontWeight: 700,
            lineHeight: 1.3,
          }}
        >
          FACT vs FCST
        </Typography>

        <Typography
          sx={{
            mt: 0.75,
            color: "text.secondary",
            fontSize: 12,
          }}
        >
          Actual performance compared with forecast · P08 2026
        </Typography>
      </Box>

        {/* KPI Cards */}
        <Box
        sx={{
            display: "grid",
            gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
            },
            gap: 1.75,
        }}
        >
        {/* KPI 1 */}
        <KPICard
            label="Fact (RSV)"
            value="$7,027"
            accentColor={theme.palette.primary.main}
            comparison={{
            status: "positive",
            value: "Actual to date",
            text: "",
            }}
        />

        {/* KPI 2 */}
        <KPICard
            label="FCST (RSV)"
            value="$7,385"
            accentColor={
            theme.palette.mode === "dark"
                ? "#40E8C8"
                : "#00A9C6"
            }
            comparison={{
            status: "positive",
            value: "forecast",
            text: "",
            }}
        />

        {/* KPI 3 */}
        <KPICard
            label="VARIANCE"
            value="+0%"
            accentColor={
            theme.palette.mode === "dark"
                ? "#E060C0"
                : "#BC2486"
            }
            comparison={{
            status: "positive",
            value: "FACT Vs FCST",
            text: "",
            }}
        />

        {/* KPI 4 */}
        <KPICard
            label="FACT + OA"
            value="$8,100"
            accentColor={
            theme.palette.mode === "dark"
                ? "#A78BFA"
                : "#7C3AED"
            }
            comparison={{
            status: "positive",
            value: "Incl. open orders",
            text: "",
            }}
        />
        </Box>

        <Box sx={{ mt: 2 }}>
          <StandardTable
            title={`FACT vs FCST by ${pivotView} — Period Detail`}
            subtitle={`2026 · 13 periods by quarter · Grand Total · ${pivotView} view`}
            columns={factVsFcstPeriodColumns}
            rows={factVsFcstPeriodRows}
            headerActions={
              <TableSegmentedControl
                options={["Channel", "Technology", "Growth", "Yearly Growth", "Period Trend"] as const}
                value={pivotView}
                onChange={setPivotView}
              />
            }
            maxHeight={430}
            compact
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <StandardTable
            title={`FACT vs FCST by ${factCut} · ${factValue}`}
            subtitle="FACT, FCST, O.A., FACT + OA and variance · follows the toggle above"
            columns={factVsFcstChannelColumns}
            rows={factVsFcstChannelRows}
            headerActions={
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <TableSegmentedControl
                  options={["RSV", "NSV", "Tons"] as const}
                  value={factValue}
                  onChange={setFactValue}
                />
                <TableSegmentedControl
                  options={["Channel", "Customer", "Technology", "Period"] as const}
                  value={factCut}
                  onChange={setFactCut}
                />
              </Box>
            }
            compact
          />
        </Box>

      {/* PRICE ANALYSIS */}
      <Box sx={{ mt: 2 }}>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Price Analysis
        </Typography>

        <Typography
          sx={{
            mt: 0.4,
            mb: 1,
            fontSize: 12,
            color: "text.secondary",
          }}
        >
          Average price trend, then by-product detail
        </Typography>

        <MultiLineChart
          title="Price Trend"
          subtitle="Average price by period · 13 × 28-day periods"
          xAxisData={priceTrendXAxisData}
          xAxisName="Period"
          series={priceTrendSeries}
          leftAxisName="Avg Price ($)"
          leftAxis={{
            min: 10,
            max: 55,
            interval: 10,
            formatter: (value) =>
              `$${value}`,
          }}
          height={260}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <StandardTable
          title={`Average Price by ${priceCut}`}
          subtitle="Avg price · vs Last Period (LP) · vs Last Year (LY)"
          columns={averagePriceColumns}
          rows={averagePriceRows}
          headerActions={
            <TableSegmentedControl
              options={["Manufacturer", "Product", "Warehouse", "Customer", "Brand", "Area", "Route"] as const}
              value={priceCut}
              onChange={setPriceCut}
            />
          }
          maxHeight={420}
          compact
        />
      </Box>
    </Box>
  );
}