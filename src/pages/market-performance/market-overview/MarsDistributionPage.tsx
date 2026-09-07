import { Box, SvgIcon, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KPICard from "../../../components/common/KPICard/KPICard";
import { BarChart } from "../../../components/common/Charts/BarChart";

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