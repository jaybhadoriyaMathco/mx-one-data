import { Box, Typography } from "@mui/material";
import { ModuleBreadcrumbs } from "../../components/common/Breadcrumbs/ModuleBreadcrumbs";
import { TargetKPICard } from "../../components/common/KPICard/TargetKPICard";
import { MultiLineChart } from "../../components/common/Charts/MultiLineChart";
import { BarChart } from "../../components/common/Charts/BarChart";
import {
  BUILDING_BLOCKS_CHARTS,
  PERFECT_STORE_CHANNEL_DATA,
  FACT_VS_FCST_DATA,
} from "../../utils/constants";

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

export function ExecutivePage() {
  return (
    <Box sx={pageContainerSx}>
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
          Building Blocks — Executive Overview
        </Typography>

        <Typography
          sx={{
            mt: 0.75,
            color: "text.secondary",
            fontSize: 12,
          }}
        >
          High-level snapshot across Performance and FACT vs FCST
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

        <TargetKPICard
          label="Cataloguing %"
          value="61%"
          subtitle="Cataloged vs target"
          target="90%"
          variance="-26pp vs target"
          varianceStatus="negative"
          progress={61}
          accentColor="#1E2A78"
        />

        <TargetKPICard
          label="Sell-In % FACT+OA"
          value="108%"
          subtitle="Delivery incl. open orders"
          target="98%"
          variance="+14pp vs target"
          varianceStatus="positive"
          progress={100}
          accentColor="#00C2D4"
        />

        <TargetKPICard
          label="Avg ROS"
          value="6.5"
          subtitle="Rate of sale · P05"
          target="7"
          variance="-0.6 vs target"
          varianceStatus="negative"
          progress={93}
          accentColor="#BC2486"
        />

        <TargetKPICard
          label="Avg Market Share"
          value="16.5%"
          subtitle="Share · P05"
          target="18.2%"
          variance="-2.5pp vs target"
          varianceStatus="negative"
          progress={91}
          accentColor="#76B900"
        />
      </Box>

    {/* Charts */}
    <Box
        sx={{
            mt: 2,
            display: "grid",
            gridTemplateColumns: {
            xs: "1fr",
            lg: "repeat(2, minmax(0, 1fr))",
            },
            gap: 1.75,
        }}
        >
        {/* 1. Perfect Store Compliance by Channel */}
        <BarChart
            title={PERFECT_STORE_CHANNEL_DATA.title}
            xAxisData={PERFECT_STORE_CHANNEL_DATA.xAxisData}
            xAxisName="Channel"
            yAxisName="PS %"
            series={PERFECT_STORE_CHANNEL_DATA.series}
            height={250}
        />

        {/* 2. OSA & Shelf (SOS) Trend */}
        <MultiLineChart
            title={BUILDING_BLOCKS_CHARTS.osaShelfTrend.title}
            xAxisData={BUILDING_BLOCKS_CHARTS.osaShelfTrend.xAxisData}
            xAxisName={BUILDING_BLOCKS_CHARTS.osaShelfTrend.xAxisName}
            series={BUILDING_BLOCKS_CHARTS.osaShelfTrend.series}
            leftAxis={{
            min: BUILDING_BLOCKS_CHARTS.osaShelfTrend.leftAxis.min,
            max: BUILDING_BLOCKS_CHARTS.osaShelfTrend.leftAxis.max,
            interval:
                BUILDING_BLOCKS_CHARTS.osaShelfTrend.leftAxis.interval,
            formatter:
                BUILDING_BLOCKS_CHARTS.osaShelfTrend.leftAxis.formatter,
            }}
            leftAxisName="%"
            height={260}
        />

        {/* 3. Forecast Accuracy vs Bias */}
        <MultiLineChart
            title={BUILDING_BLOCKS_CHARTS.forecastAccuracyBias.title}
            xAxisData={
            BUILDING_BLOCKS_CHARTS.forecastAccuracyBias.xAxisData
            }
            xAxisName={
            BUILDING_BLOCKS_CHARTS.forecastAccuracyBias.xAxisName
            }
            series={
            BUILDING_BLOCKS_CHARTS.forecastAccuracyBias.series
            }
            leftAxis={{
            min:
                BUILDING_BLOCKS_CHARTS.forecastAccuracyBias.leftAxis.min,
            max:
                BUILDING_BLOCKS_CHARTS.forecastAccuracyBias.leftAxis.max,
            interval:
                BUILDING_BLOCKS_CHARTS.forecastAccuracyBias.leftAxis
                .interval,
            formatter:
                BUILDING_BLOCKS_CHARTS.forecastAccuracyBias.leftAxis
                .formatter,
            }}
            leftAxisName="%"
            height={260}
        />

        {/* 4. FACT vs FCST */}
        <BarChart
            title={FACT_VS_FCST_DATA.title}
            xAxisData={FACT_VS_FCST_DATA.xAxisData}
            xAxisName="Period"
            yAxisName="Units (k)"
            series={FACT_VS_FCST_DATA.series}
            height={250}
        />
        </Box>
    </Box>
  );
}