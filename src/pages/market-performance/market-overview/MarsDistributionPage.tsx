import { Box, SvgIcon, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import KPICard from "../../../components/common/KPICard/KPICard";
import { BarChart } from "../../../components/common/Charts/BarChart";
import { MultiLineChart } from "../../../components/common/Charts/MultiLineChart";
import {
  MARS_DISTRIBUTION_TREND_CHART,
} from "../../../utils/constants";

const InfoOutlinedIcon = (props: any) => (
  <SvgIcon viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M11 7h2v2h-2V7Zm0 4h2v6h-2v-6Zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
    />
  </SvgIcon>
);

const NAVY = "#1A237E";
const CYAN = "#22D3EE";

const ALCANCES_SKUS = [
  "Ped SB Beef VEG 12",
  "Ped AD Beef 12",
  "Ped PPY Beef 12",
  "Ped SB Lamb 12",
  "MVP Bf+Ckn 24/85g",
  "Ped Pavo y Zanahor.",
];

const ALCANCES_VALUES = [50, 77, 75, 69, 52, 74];

const RETAILERS = ["Chedraui", "Calimax", "Walmart/Bodega"];

const DropdownArrow = () => (
  <Box
    component="span"
    sx={{
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      width: 0,
      height: 0,
      borderLeft: "4px solid transparent",
      borderRight: "4px solid transparent",
      borderTop: "5px solid #555",
      pointerEvents: "none",
    }}
  />
);

const pageContainerSx = {
  width: "100%",
  height: "100%",
  minHeight: 0,
  overflow: "auto",
  bgcolor: (theme: any) =>
    theme.palette.mode === "dark" ? "background.default" : "#FFF7F7",
  color: "text.primary",
  borderRadius: 2,
  p: 2,
};

export function MarsDistributionPage() {
  const theme = useTheme();

  const [activeTrendTab, setActiveTrendTab] = useState(
    MARS_DISTRIBUTION_TREND_CHART.activeTab,
  );

  const [selectedSku, setSelectedSku] = useState(
    MARS_DISTRIBUTION_TREND_CHART.defaultSku,
  );

  return (
    <Box sx={pageContainerSx}>
      <Box sx={{ mb: 2.25 }}>
        <Typography
          component="h1"
          sx={{ m: 0, fontSize: 22, fontWeight: 700, lineHeight: 1.3 }}
        >
          Mars Distribution
        </Typography>
        <Typography sx={{ mt: 0.75, color: "text.secondary", fontSize: 12 }}>
          Distribution coverage · All categories · All channels · P08 2026
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
          label="Total STORES SELLING"
          value="5,329"
          accentColor={theme.palette.primary.main}
          comparison={{ status: "positive", value: "+99", text: "vs P12" }}
        />
        <KPICard
          label="Avg % ALCANCES (REACH)"
          value="68.4%"
          accentColor={theme.palette.mode === "dark" ? "#40E8C8" : "#00A9C6"}
          comparison={{ status: "positive", value: "+1.8pp", text: "vs P12" }}
        />
        <KPICard
          label="ROS YTD"
          value="$32M"
          accentColor={theme.palette.mode === "dark" ? "#E060C0" : "#BC2486"}
          comparison={{ status: "positive", value: "+13%", text: "vs LY" }}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <MultiLineChart
          title={MARS_DISTRIBUTION_TREND_CHART.title}
          subtitle={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                flexWrap: "wrap",
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontSize: 12,
                  color: "text.secondary",
                }}
              >
                {MARS_DISTRIBUTION_TREND_CHART.subtitle}
              </Typography>

              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  px: 1,
                  py: 0.25,
                  borderRadius: 2,
                  border: "1px solid #F2C46D",
                  bgcolor: "#FFF8E8",
                  color: "#9A6700",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                Grain TBC: SKU vs category vs segment
              </Box>
            </Box>
          }
          xAxisData={MARS_DISTRIBUTION_TREND_CHART.xAxisData}
          xAxisName={MARS_DISTRIBUTION_TREND_CHART.xAxisName}
          series={MARS_DISTRIBUTION_TREND_CHART.series}
          leftAxis={{
            min: MARS_DISTRIBUTION_TREND_CHART.leftAxis.min,
            max: MARS_DISTRIBUTION_TREND_CHART.leftAxis.max,
            interval: MARS_DISTRIBUTION_TREND_CHART.leftAxis.interval,
            formatter: MARS_DISTRIBUTION_TREND_CHART.leftAxis.formatter,
          }}
          rightAxis={{
            min: MARS_DISTRIBUTION_TREND_CHART.rightAxis.min,
            max: MARS_DISTRIBUTION_TREND_CHART.rightAxis.max,
            interval: MARS_DISTRIBUTION_TREND_CHART.rightAxis.interval,
            formatter: MARS_DISTRIBUTION_TREND_CHART.rightAxis.formatter,
          }}
          leftAxisName="ROS (units/store)"
          rightAxisName="Stores Selling"
          tabs={MARS_DISTRIBUTION_TREND_CHART.tabs}
          activeTab={activeTrendTab}
          onTabChange={setActiveTrendTab}
          tabMinWidth={58}
          showLegend={false}
          headerActions={
            <Box
              sx={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <Box
                component="select"
                value={selectedSku}
                onChange={(event) => setSelectedSku(event.target.value)}
                sx={{
                  height: 30,
                  minWidth: 150,
                  px: 1.5,
                  pr: 4,
                  borderRadius: "6px",
                  border: "1px solid #1A237E",
                  backgroundColor: "#FFFFFF",
                  color: "#111111",
                  fontSize: 12,
                  cursor: "pointer",
                  outline: "none",

                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",

                  "&:focus": {
                    borderColor: "#1A237E",
                  },
                }}
              >
                {MARS_DISTRIBUTION_TREND_CHART.skuOptions.map((sku) => (
                  <option key={sku} value={sku}>
                    {sku}
                  </option>
                ))}
              </Box>

              <DropdownArrow />
            </Box>
          }
          height={300}
        />
      </Box>

      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: 1.75,
        }}
      >
        <BarChart
          title="% Alcances by SKU"
          subtitle="P13 2025 · Top products"
          infoBanner={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 1,
                borderRadius: 2,
                bgcolor: (t) =>
                  t.palette.mode === "dark"
                    ? "rgba(59,130,246,0.15)"
                    : "#EEF4FF",
                color: (t) =>
                  t.palette.mode === "dark" ? "#93C5FD" : "#1D4ED8",
                fontSize: 12,
                lineHeight: 1.4,
              }}
            >
              <InfoOutlinedIcon sx={{ fontSize: 16, flexShrink: 0 }} />
              Mars portfolio only — competitor alcances pending data confirmation.
            </Box>
          }
          xAxisData={ALCANCES_SKUS}
          xAxisName="% Alcances"
          yAxisName="SKU"
          series={[
            {
              name: "% Alcances",
              data: ALCANCES_VALUES,
              color: NAVY,
            },
          ]}
          yAxis={{
            min: 0,
            max: 100,
            interval: 10,
            formatter: (value) => `${value}%`,
          }}
          height={320}
          barMaxWidth={22}
          horizontal
          showLegend={false}
        />

        <BarChart
          title="Distribution by Retailer"
          subtitle="ROS YTD vs Stores Selling"
          xAxisData={RETAILERS}
          xAxisName="Retailer"
          yAxisName="Value"
          series={[
            {
              name: "ROS YTD",
              data: [175, 50, 235],
              color: NAVY,
            },
            {
              name: "Stores Selling",
              data: [195, 80, 615],
              color: CYAN,
            },
          ]}
          yAxis={{
            min: 0,
            max: 700,
            interval: 100,
          }}
          height={320}
          barMaxWidth={48}
          showLegend={false}
        />
      </Box>
    </Box>
  );
}