import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KPICard from "../../../components/common/KPICard/KPICard";
import { MultiLineChart } from "../../../components/common/Charts/MultiLineChart";
import { BarChart } from "../../../components/common/Charts/BarChart";
import { StandardTable } from "../../../components/common/Tables/StandardTable";
import { TableSegmentedControl } from "../../../components/common/TableFilters/TableSegmentedControl";
import {
  brandSomXAxisData,
  brandSomAllTechSeries,
  brandSomDrySeries,
  brandSomWetSeries,
  breedSizeXAxisData,
  marsBreedSizeMixSeries,
  marketBreedSizeMixSeries,
  breedSizeIndexSeries,
  somTrendMonthlyXAxis,
  somTrendQuarterlyXAxis,
  somTrendYearlyXAxis,
  somTrendMonthlySeries,
  somTrendQuarterlySeries,
  somTrendYearlySeries,
  somCategoryXAxis,
  somCategorySeries,
  somChannelXAxis,
  somChannelSeries,
  somChannelLegend,
  somSubChannelXAxis,
  somSubChannelSeries,
  somTableColumns,
  somTableRows,
  type SomView,
  type SomPeriod,
} from "../../../utils/constants";
import { salesSomColumns, salesSomRows, salesRsvRows } from "../../../utils/tableData";

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

export function ShareVolumePage() {
  const theme = useTheme();
  const [tableMetric, setTableMetric] = useState<"SOM %" | "Sales (RSV)">("SOM %");

  const [somView, setSomView] = useState<SomView>("Trend");
  const [somPeriod, setSomPeriod] = useState<SomPeriod>("Monthly");
  const [somDisplay, setSomDisplay] = useState<"Graph" | "Table">("Graph");

  const somTrend =
    somPeriod === "Quarterly"
      ? { xAxis: somTrendQuarterlyXAxis, series: somTrendQuarterlySeries, name: "Quarter" }
      : somPeriod === "Yearly"
        ? { xAxis: somTrendYearlyXAxis, series: somTrendYearlySeries, name: "Year" }
        : { xAxis: somTrendMonthlyXAxis, series: somTrendMonthlySeries, name: "Month" };

  const somBar =
    somView === "Category"
      ? {
          xAxis: somCategoryXAxis,
          series: somCategorySeries,
          axisName: "Category",
          max: 45,
          interval: 5,
          legend: undefined,
          subtitle: "Manufacturer SOM by category · All channels",
        }
      : somView === "Channel"
        ? {
            xAxis: somChannelXAxis,
            series: somChannelSeries,
            axisName: "Manufacturer",
            max: 40,
            interval: 5,
            legend: somChannelLegend,
            subtitle: "Manufacturer SOM split by channel · All channels",
          }
        : {
            xAxis: somSubChannelXAxis,
            series: somSubChannelSeries,
            axisName: "Sub-channel",
            max: 60,
            interval: 10,
            legend: undefined,
            subtitle: "Sub-channel SOM split by competitor · All channels",
          };

  const somSubtitle =
    somView === "Trend"
      ? "SOM trend by manufacturer · share within tracked manufacturers · All channels"
      : somBar.subtitle;

  const somControls = (
    <>
      <TableSegmentedControl
        options={["Trend", "Category", "Channel", "Sub-channel"] as const}
        value={somView}
        onChange={(v) => setSomView(v as SomView)}
      />

      {somView === "Trend" && somDisplay === "Graph" && (
        <TableSegmentedControl
          options={["Monthly", "Quarterly", "Yearly"] as const}
          value={somPeriod}
          onChange={(v) => setSomPeriod(v as SomPeriod)}
        />
      )}

      <Box
        component="button"
        type="button"
        onClick={() =>
          setSomDisplay((d) => (d === "Graph" ? "Table" : "Graph"))
        }
        sx={{
          appearance: "none",
          fontFamily: "inherit",
          display: "inline-flex",
          alignItems: "center",
          gap: 0.7,
          px: 1.5,
          py: 0.75,
          fontSize: 12,
          fontWeight: 700,
          lineHeight: 1.2,
          cursor: "pointer",
          borderRadius: "8px",
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          color: "primary.main",
          whiteSpace: "nowrap",
          "&:hover": { bgcolor: "action.hover" },
        }}
      >
        {somDisplay === "Graph" ? "▦ Table" : "▲ Graph"}
      </Box>
    </>
  );

  const [brandView, setBrandView] =
    useState<"All Tech" | "Dry" | "Wet">("All Tech");

  const brandSomSeries =
    brandView === "Dry"
      ? brandSomDrySeries
      : brandView === "Wet"
        ? brandSomWetSeries
        : brandSomAllTechSeries;

  const [segmentationView, setSegmentationView] =
    useState<
      | "Technology"
      | "Price Tier"
      | "Size Range"
      | "Life Stage"
      | "Breed Size"
    >("Breed Size");

  const segmentationTabs = [
    "Technology",
    "Price Tier",
    "Size Range",
    "Life Stage",
    "Breed Size",
  ] as const;

  return (
    <Box sx={pageContainerSx}>
      <Box sx={{ mb: 2.5 }}>
        <Typography
          component="h1"
          sx={{
            fontSize: 22,
            fontWeight: 700,
            lineHeight: 1.3,
          }}
        >
          Share & Volume
        </Typography>

        <Typography
          sx={{
            mt: 0.75,
            color: "text.secondary",
            fontSize: 13,
          }}
        >
          All categories · All channels · P08 2026 · RSV ($)
        </Typography>
      </Box>

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
        <KPICard
          label="MARS SHARE OF MARKET"
          value="23.4%"
          accentColor={theme.palette.primary.main}
          comparison={{
            status: "neutral",
            value: "— flat vs LY",
            text: "· total category",
          }}
          footerContent={
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1px 1fr",
                alignItems: "stretch",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Modern
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: 27,
                    fontWeight: 700,
                    lineHeight: 1.1,
                  }}
                >
                  24.6%
                </Typography>

                <Typography
                  sx={{
                    mt: 0.75,
                    color: "success.main",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  +0.5pp
                </Typography>
              </Box>

              <Box
                sx={{
                  bgcolor: "divider",
                  mx: 2,
                }}
              />

              <Box>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Traditional
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: 27,
                    fontWeight: 700,
                    lineHeight: 1.1,
                  }}
                >
                  21.9%
                </Typography>

                <Typography
                  sx={{
                    mt: 0.75,
                    color: "text.secondary",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  0pp
                </Typography>
              </Box>
            </Box>
          }
        />

        <KPICard
          label="CATEGORY VALUE YTD"
          value="$32.5M"
          accentColor={
            theme.palette.mode === "dark"
              ? "#E060C0"
              : "#BC2486"
          }
          comparison={{
            status: "positive",
            value: "+6.0%",
            text: "vs FY25",
          }}
        />

        <KPICard
          label="VOLUME GROWTH"
          value="-0.7%"
          accentColor="#84BD00"
          comparison={{
            status: "negative",
            value: "Below value growth",
          }}
        />
      </Box>

      {/* SOM & MARKET SHARE */}
      <Box sx={{ mt: 2, minWidth: 0 }}>
        {somDisplay === "Table" ? (
          <StandardTable
            title="SOM & Market Share"
            subtitle={somSubtitle}
            columns={somTableColumns}
            rows={somTableRows}
            headerActions={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                {somControls}
              </Box>
            }
            compact
          />
        ) : somView === "Trend" ? (
          <MultiLineChart
            title="SOM & Market Share"
            subtitle={somSubtitle}
            xAxisData={somTrend.xAxis}
            xAxisName={somTrend.name}
            series={somTrend.series}
            leftAxisName="SOM (%)"
            leftAxis={{
              min: 0,
              max: 45,
              interval: 5,
              formatter: (value) => `${value}%`,
            }}
            rightAxis={{
              min: 4,
              max: 6.5,
              interval: 0.5,
              formatter: (value) => `+${value.toFixed(1)}%`,
              nameGap: 56,
            }}
            headerActions={somControls}
            height={300}
          />
        ) : (
          <BarChart
            title="SOM & Market Share"
            subtitle={somSubtitle}
            xAxisData={somBar.xAxis}
            xAxisName={somBar.axisName}
            yAxisName="SOM (%)"
            series={somBar.series}
            legendItems={somBar.legend}
            yAxis={{
              min: 0,
              max: somBar.max,
              interval: somBar.interval,
              formatter: (value) => `${value}%`,
            }}
            headerActions={somControls}
            barMaxWidth={54}
            height={300}
          />
        )}
      </Box>

      {/* MARKET SEGMENTATION */}
      <Box
        sx={{
          mt: 2,
          width: "100%",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          p: 2,
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
            flexWrap: "wrap",
            mb: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Market Segmentation
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              Breed segmentation · 2025 · Dog
            </Typography>
          </Box>

          {/* Toggle buttons */}
          <Box
            sx={{
              display: "flex",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            {segmentationTabs.map((tab, index) => {
              const isActive =
                segmentationView === tab;

              return (
                <Box
                  key={tab}
                  component="button"
                  onClick={() =>
                    setSegmentationView(tab)
                  }
                  sx={{
                    border: 0,

                    borderLeft:
                      index === 0
                        ? "none"
                        : "1px solid",

                    borderColor: "divider",

                    px: 1.6,
                    py: 0.7,

                    fontFamily: "inherit",
                    fontSize: 12,

                    cursor: "pointer",

                    color: isActive
                      ? "#FFFFFF"
                      : "text.secondary",

                    bgcolor: isActive
                      ? "primary.main"
                      : "transparent",

                    "&:hover": {
                      bgcolor: isActive
                        ? "primary.dark"
                        : "action.hover",
                    },
                  }}
                >
                  {tab}
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Three charts */}
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, minmax(0, 1fr))",
            },

            gap: 2,
          }}
        >
          <BarChart
            title="MARS Mix %"
            xAxisData={breedSizeXAxisData}
            xAxisName="Segment"
            yAxisName="Mix (%)"
            series={marsBreedSizeMixSeries}
            yAxis={{
              min: 0,
              max: 90,
              interval: 20,
              formatter: (value) => `${value}%`,
            }}
            showLegend={false}
            showContainer={false}
            height={220}
          />

          <BarChart
            title="Market Mix %"
            xAxisData={breedSizeXAxisData}
            xAxisName="Segment"
            yAxisName="Mix (%)"
            series={marketBreedSizeMixSeries}
            yAxis={{
              min: 0,
              max: 80,
              interval: 10,
              formatter: (value) => `${value}%`,
            }}
            showLegend={false}
            showContainer={false}
            height={220}
          />

          <BarChart
            title="Index (100 = parity)"
            xAxisData={breedSizeXAxisData}
            xAxisName="Segment"
            yAxisName="Index (100=parity)"
            series={breedSizeIndexSeries}
            yAxis={{
              min: 0,
              max: 250,
              interval: 50,
            }}
            showLegend={false}
            showContainer={false}
            height={220}
          />
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <MultiLineChart
          title="Brand SOM Evolution"
          subtitle="Jan 2023 – Jun 2026 · Click legend to isolate"
          xAxisData={brandSomXAxisData}
          xAxisName="Month"
          series={brandSomSeries}
          leftAxisName="SOM (%)"
          leftAxis={{
            min: 0,
            max: 50,
            interval: 10,
            formatter: (value) => `${value}%`,
          }}
          tabs={["All Tech", "Dry", "Wet"]}
          activeTab={brandView}
          onTabChange={(tab) =>
            setBrandView(
              tab as "All Tech" | "Dry" | "Wet",
            )
          }
          tabMinWidth={56}
          height={260}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <StandardTable
          title="Sales & SOM by Cut — Full Matrix"
          subtitle={tableMetric === "SOM %"
            ? "Share of Market (%) by category, channel and sub-channel · leader highlighted"
            : "Sales / RSV ($) by category, channel and sub-channel · leader highlighted"}
          columns={salesSomColumns}
          rows={tableMetric === "SOM %" ? salesSomRows : salesRsvRows}
          headerActions={
            <TableSegmentedControl
              options={["SOM %", "Sales (RSV)"] as const}
              value={tableMetric}
              onChange={setTableMetric}
            />
          }
          maxHeight={520}
          compact
        />
      </Box>
    </Box>
  );
}