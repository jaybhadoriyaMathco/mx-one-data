import { useState } from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KPICard from "../../../components/common/KPICard/KPICard";
import { MultiLineChart } from "../../../components/common/Charts/MultiLineChart";
import { BarChart } from "../../../components/common/Charts/BarChart";
import {
  pricingWeeklyXAxisData,
  dogDryPriceSeries,
  dogWetPriceSeries,
  catDryPriceSeries,
  catWetPriceSeries,
  priceIndexManufacturerXAxisData,
  priceIndexCompetitorSeries,
  priceRangeSubChannelXAxisData,
  priceRangeSubChannelSeries,
} from "../../../utils/constants";


const pageContainerSx = {
  width: "100%",
  minHeight: "100%",
  boxSizing: "border-box",

  bgcolor: (theme: any) =>
    theme.palette.mode === "dark"
      ? "background.default"
      : "#FFF7F7",

  color: "text.primary",

  borderRadius: 2,

  p: 2,
};


type PriceSegment =
  | "Dog Dry"
  | "Dog Wet"
  | "Cat Dry"
  | "Cat Wet";


export function PricingPriceIndexPage() {
  const theme = useTheme();

  const [priceSegment, setPriceSegment] =
    useState<PriceSegment>("Dog Dry");

  const priceSeries = (() => {
    switch (priceSegment) {
      case "Dog Wet":
        return dogWetPriceSeries;

      case "Cat Dry":
        return catDryPriceSeries;

      case "Cat Wet":
        return catWetPriceSeries;

      case "Dog Dry":
      default:
        return dogDryPriceSeries;
    }
  })();


  return (
    <Box sx={pageContainerSx}>
      <Box
        sx={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems:
            "flex-start",

          gap: 2,

          mb: 2.25,

          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography
            component="h1"
            sx={{
              m: 0,

              fontSize: 22,

              fontWeight: 700,

              lineHeight: 1.3,
            }}
          >
            Pricing & Price Index
          </Typography>


          <Typography
            sx={{
              mt: 0.75,

              color:
                "text.secondary",

              fontSize: 12,
            }}
          >
            Avg selling price · All categories · All channels · P06 2026
          </Typography>
        </Box>


        {/* SRM DASHBOARD BUTTON */}

        <Button
          variant="outlined"

          endIcon={
            <span>🔒</span>
          }

          sx={{
            height: 34,

            px: 1.75,

            borderRadius: 2,

            textTransform:
              "none",

            fontSize: 13,

            fontWeight: 600,

            borderColor:
              "divider",

            color:
              "primary.main",

            bgcolor:
              "background.paper",
          }}
        >
          Open SRM Dashboard
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",

            md:
              "repeat(2, minmax(0, 1fr))",

            lg:
              "repeat(3, minmax(0, 1fr))",
          },

          gap: 1.75,
        }}
      >

        {/* KPI 1 */}

        <KPICard
          label="MARS DOG DRY AVG PRICE"

          value="$862"

          accentColor={
            theme.palette.primary.main
          }

          comparison={{
            status: "neutral",

            value: "~Flat",

            text:
              "W4 vs W3 · 66 stores",
          }}
        />


        {/* KPI 2 */}

        <KPICard
          label="MARS CAT DRY AVG PRICE"

          value="$545"

          accentColor={
            theme.palette.mode ===
            "dark"
              ? "#40E8C8"
              : "#00A9C6"
          }

          comparison={{
            status:
              "positive",

            value:
              "+6 MXN",

            text:
              "W4 vs W3",
          }}
        />


        {/* KPI 3 */}

        <KPICard
          label="STORES SURVEYED"

          value="69"

          accentColor={
            theme.palette.mode ===
            "dark"
              ? "#E060C0"
              : "#BC2486"
          }

          comparison={{
            status:
              "neutral",

            value:
              "P12 2025 · All Areas",
          }}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <MultiLineChart
          title="Average Price Trend by Segment (Weekly)"

          subtitle="Select segment below to highlight"

          xAxisData={
            pricingWeeklyXAxisData
          }

          xAxisName="Week"

          series={
            priceSeries
          }

          leftAxisName="Avg Price (MXN)"

          leftAxis={{
            min: 500,

            max: 1000,

            interval: 50,

            formatter: (
              value,
            ) =>
              value.toLocaleString(),
          }}

          tabs={[
            "Dog Dry",
            "Dog Wet",
            "Cat Dry",
            "Cat Wet",
          ]}

          activeTab={
            priceSegment
          }

          onTabChange={(
            tab,
          ) =>
            setPriceSegment(
              tab as PriceSegment,
            )
          }

          tabMinWidth={82}

          height={260}
        />
      </Box>

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",

            lg:
              "repeat(2, minmax(0, 1fr))",
          },

          gap: 2,

          mt: 2,
        }}
      >

        <BarChart
          title="Price Index vs Competitors"

          subtitle="MARS vs Nestlé vs Malta · Dog Dry"

          xAxisData={
            priceIndexManufacturerXAxisData
          }

          xAxisName="Manufacturer"

          yAxisName="Price Index (MARS=100)"

          series={
            priceIndexCompetitorSeries
          }

          yAxis={{
            min: 0,

            max: 130,

            interval: 20,
          }}

          showLegend={
            false
          }


          height={
            220
          }
        />

        <BarChart
          title="Price Range by Sub-channel"

          subtitle="All segments · W4 P12"

          xAxisData={
            priceRangeSubChannelXAxisData
          }

          xAxisName="Sub-channel"

          yAxisName="Avg Price (MXN)"

          series={
            priceRangeSubChannelSeries
          }

          yAxis={{
            min: 0,

            max: 900,

            interval: 200,

            formatter: (
              value,
            ) =>
              value.toLocaleString(),
          }}

          showLegend={
            false
          }

          height={
            220
          }
        />

      </Box>

    </Box>
  );
}