import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import KPICard from "../../../components/common/KPICard/KPICard";

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

export function MarsDistributionPage() {
  const theme = useTheme();

  return (
    <Box sx={pageContainerSx}>
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
          Mars Distribution
        </Typography>

        <Typography
          sx={{
            mt: 0.75,
            color: "text.secondary",
            fontSize: 12,
          }}
        >
          Distribution coverage · All categories · All channels · P08 2026
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
        <KPICard
          label="Total STORES SELLING"
          value="5,329"
          accentColor={theme.palette.primary.main}
          comparison={{
            status: "positive",
            value: "+99",
            text: "vs P12",
          }}
        />

        {/* KPI 2 */}
        <KPICard
          label="Avg % ALCANCES (REACH)"
          value="68.4%"
          accentColor={
            theme.palette.mode === "dark"
              ? "#40E8C8"
              : "#00A9C6"
          }
          comparison={{
            status: "positive",
            value: "+1.8pp",
            text: "vs P12",
          }}
        />

        {/* KPI 3 */}
        <KPICard
          label="ROS YTD"
          value="$32M"
          accentColor={
            theme.palette.mode === "dark"
              ? "#E060C0"
              : "#BC2486"
          }
          comparison={{
            status: "positive",
            value: "+13%",
            text: "vs LY",
          }}
        />
      </Box>

      {/* Future chart area */}
      <Box
        sx={{
          mt: 2,
          minHeight: 250,
        }}
      >
      </Box>
    </Box>
  );
}