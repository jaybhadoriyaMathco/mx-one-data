import { Box, Chip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useState } from "react";

import KPICard from "../../components/common/KPICard/KPICard";
import { ModuleBreadcrumbs } from "../../components/common/Breadcrumbs/ModuleBreadcrumbs";
import {
  MultiLineChart,
  type MultiLineSeries,
} from "../../components/common/Charts/MultiLineChart";

import type { RootState } from "../../store";

import { useNavigate } from "react-router-dom";

const pageContainerSx = {
  width: "100%",
  height: "100%",
  minHeight: 0,
  overflow: "auto",

  bgcolor: (t: any) =>
    t.palette.mode === "dark"
      ? "background.default"
      : "#FFF7F7",

  color: "text.primary",
  borderRadius: 2,
  p: 2,
};

/* -------------------------------- */
/* SOM MONTHLY DATA */
/* -------------------------------- */

const monthlyXAxisData = [
  "Jul25",
  "Aug25",
  "Sep25",
  "Oct25",
  "Nov25",
  "Dec25",
  "Jan26",
  "Feb26",
  "Mar26",
  "Apr26",
  "May26",
  "Jun26",
];

const monthlySomSeries: MultiLineSeries[] = [
  {
    name: "MARS",
    color: "#182B83",
    fill:true,
    data: [
      40,
      39,
      40,
      40,
      40,
      40,
      40,
      40,
      40,
      40,
      40,
      40,
    ],
  },

  {
    name: "Nestlé",
    color: "#F57C00",
    fill:true,
    data: [
      35,
      36,
      35,
      35,
      36,
      36,
      35,
      35,
      36,
      36,
      36,
      35,
    ],
  },

  {
    name: "Malta",
    color: "#00A9C6",
    data: [
      10,
      10,
      10,
      9.5,
      9.2,
      9.1,
      10,
      9.6,
      10,
      9.7,
      9.1,
      9.2,
    ],
  },

  {
    name: "ADM",
    color: "#BC2486",
    data: [
      5,
      5,
      5,
      4.8,
      4.7,
      4.6,
      5,
      4.8,
      4.9,
      4.8,
      4.7,
      4.6,
    ],
  },

  {
    name: "Total Category growth %",
    color: "#59606D",
    fill: true,
    yAxisIndex: 1,
    data: [
      5.5,
      5.8,
      6.4,
      6,
      5.6,
      5.9,
      5.2,
      5.5,
      6.1,
      5.5,
      5.1,
      4.9,
    ],
  },
];

/* -------------------------------- */
/* SOM QUARTERLY DATA */
/* -------------------------------- */

const quarterlyXAxisData = [
  "Q1-24",
  "Q2-24",
  "Q3-24",
  "Q4-24",
  "Q1-25",
  "Q2-25",
  "Q3-25",
  "Q4-25",
  "Q1-26",
  "Q2-26",
];

const quarterlySomSeries: MultiLineSeries[] = [
  {
    name: "MARS",
    color: "#182B83",
    fill:true,
    data: [
      40,
      39.5,
      39.2,
      39.5,
      39.4,
      38,
      38.5,
      39,
      39.2,
      39.5,
    ],
  },

  {
    name: "Nestlé",
    color: "#F57C00",
    fill:true,
    data: [
      34,
      34.5,
      34,
      35,
      36,
      35.5,
      36,
      36,
      36.2,
      36.5,
    ],
  },

  {
    name: "Malta",
    color: "#00A9C6",
    data: [
      9,
      9,
      9,
      8.8,
      9,
      8.8,
      8.6,
      8.7,
      9,
      8.5,
    ],
  },

  {
    name: "ADM",
    color: "#BC2486",
    data: [
      4.5,
      4.5,
      4.4,
      4.3,
      4.3,
      4.2,
      4.2,
      4.4,
      4.3,
      4.1,
    ],
  },

  {
    name: "Total Category growth %",
    color: "#59606D",
    fill:true,
    dashed: true,
    yAxisIndex: 1,
    data: [
      4.7,
      5.2,
      5.2,
      5.5,
      5.9,
      5.7,
      5.8,
      5.9,
      5.4,
      5,
    ],
  },
];

/* -------------------------------- */
/* CATEGORY GROWTH DATA */
/* -------------------------------- */

const categoryGrowthXAxisData = [
  "P01",
  "P02",
  "P03",
  "P04",
  "P05",
  "P06",
  "P07",
  "P08",
  "P09",
  "P10",
  "P11",
  "P12",
  "P13",
];

const categoryGrowthSeries: MultiLineSeries[] = [
  {
    name: "Value — RSV",
    color: "#182B83",
    yAxisIndex: 0,
    area: true,
    data: [
      2.35,
      2.4,
      2.48,
      2.42,
      2.5,
      2.6,
      2.55,
      2.62,
      2.58,
      2.55,
      2.7,
      2.85,
      2.88,
    ],
  },

  {
    name: "Volume (Tons)",
    color: "#00A9C6",
    yAxisIndex: 1,
    data: [
      45.5,
      45.8,
      46.5,
      46.2,
      45.6,
      47.5,
      46.9,
      47.3,
      46.4,
      46,
      46.6,
      47.7,
      46.8,
    ],
  },
];

/* -------------------------------- */
/* PAGE */
/* -------------------------------- */

export function ExecutiveViewPage() {

  const navigate = useNavigate();
  const theme = useTheme();

  const [somView, setSomView] =
    useState<"Monthly" | "Quarterly">(
      "Monthly",
    );

  const { compareYears, comparePeriods } =
    useSelector(
      (state: RootState) =>
        state.marketFilters,
    );

  const comparingItems = [
    ...compareYears,
    ...comparePeriods,
  ];

  return (
    <Box sx={pageContainerSx}>
      <ModuleBreadcrumbs />

      {/* PAGE HEADER */}

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
          <Typography
            component="h1"
            sx={{
              m: 0,
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            Executive View
          </Typography>

          <Typography
            sx={{
              mt: 0.75,
              color: "text.secondary",
              fontSize: 12,
            }}
          >
            Strategic market health summary · All
            categories · Traditional channel · P08
            2026 · RSV ($)
          </Typography>
        </Box>

        {comparingItems.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              pt: 0.5,
            }}
          >
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

      {/* KPI CARDS */}

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
          breakdown={{
            items: [
              {
                label: "MODERN",
                value: "24.6%",
                comparison: "+0.5pp",
                status: "positive",
              },
              {
                label: "TRADITIONAL",
                value: "21.9%",
                comparison: "0pp",
                status: "neutral",
              },
            ],
          }}
        />

        <KPICard
          label="CATEGORY VALUE GROWTH"
          value="+4.1%"
          accentColor={
            theme.palette.mode === "dark"
              ? "#E060C0"
              : "#BC2486"
          }
          comparison={{
            status: "positive",
            value: "YTD vs FY25",
          }}
          showChart
          chart={{
            color:
              theme.palette.mode === "dark"
                ? "#E060C0"
                : "#BC2486",

            fill: true,

            data: [
              { value: 3.6 },
              { value: 3.8 },
              { value: 3.9 },
              { value: 3.7 },
              { value: 3.4 },
              { value: 3.8 },
              { value: 4.2 },
              { value: 4.5 },
              { value: 4.4 },
              { value: 4.1 },
            ],
          }}
        />

        <KPICard
          label="AVG STORES SELLING"
          value="5,329"
          accentColor={theme.palette.warning.main}
          comparison={{
            status: "positive",
            value: "+99 vs P12 2025",
          }}
          showChart
          chart={{
            color:
              theme.palette.mode === "dark"
                ? "#40E8C8"
                : "#00DCFA",

            fill: true,

            data: [
              { value: 4800 },
              { value: 4920 },
              { value: 5000 },
              { value: 5050 },
              { value: 5100 },
              { value: 5180 },
              { value: 5220 },
              { value: 5260 },
              { value: 5280 },
              { value: 5329 },
            ],
          }}
        />
      </Box>

      {/* GRAPHS */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            lg: "repeat(2, minmax(0, 1fr))",
          },

          gap: 2,

          mt: 2,
        }}
      >
        {/* SOM TREND GRAPH */}

        <MultiLineChart

          actionLabel="Share & Volume →"
          onActionClick={() =>
            navigate("/market-performance/market-overview/share-volume")
          }
          leftAxis={{
            min: 0,
            max: 50,
            interval: 10,
            formatter: (value) => `${value}%`,
          }}
          rightAxis={{
            min: 4.4,
            max: 6,
            interval: 0.4,
            formatter: (value) => `${value.toFixed(1)}%`,
          }}

          title="SOM Trend by Manufacturer"
          subtitle={
            somView === "Monthly"
              ? "Monthly · Traditional channel"
              : "Quarterly · Traditional channel"
          }
          xAxisData={
            somView === "Monthly"
              ? monthlyXAxisData
              : quarterlyXAxisData
          }
          xAxisName={
            somView === "Monthly"
              ? "Month"
              : "Quarter"
          }
          series={
            somView === "Monthly"
              ? monthlySomSeries
              : quarterlySomSeries
          }
          leftAxisName="SOM (%)"
          tabs={[
            "Monthly",
            "Quarterly",
          ]}
          activeTab={somView}
          onTabChange={(tab) =>
            setSomView(
              tab as
                | "Monthly"
                | "Quarterly",
            )
          }
          height={260}
        />

        {/* CATEGORY GROWTH GRAPH */}

        <MultiLineChart

          actionLabel="Share & Volume →"
          onActionClick={() =>
            navigate("/market-performance/market-overview/share-volume")
          }
          leftAxis={{
            min: 2.4,
            max: 2.7,
            interval: 0.05,
            formatter: (value) => `$${value.toFixed(1)}M`,
          }}
          rightAxis={{
            min: 45.5,
            max: 48,
            interval: 0.5,
            formatter: (value) => `${value.toFixed(1)}k`,
          }}
          title="Category Growth — Volume & Value"
          subtitle="Value & Volume together · P01–P13 2025"
          xAxisData={
            categoryGrowthXAxisData
          }
          xAxisName="Period"
          series={categoryGrowthSeries}
          leftAxisName="RSV"
          rightAxisName="Volume (Tons k)"
          height={260}
        />
      </Box>
    </Box>
  );
}