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

export function CategorySkuPage() {
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
          Category & SKU
        </Typography>

        <Typography
          sx={{
            mt: 0.75,
            color: "text.secondary",
            fontSize: 12,
          }}
        >
          MARS performance compared with market · All categories · All channels · P08 2026
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
          label="MARS TOTAL VALUE YTD"
          value="$17M"
          accentColor={theme.palette.primary.main}
          comparison={{
            status: "positive",
            value: "+4.4% ",
            text: "vs FY25",
          }}
        />

        {/* KPI 2 */}
        <KPICard
          label="MARS VOLUME YTD (TONS)"
          value="80,380"
          accentColor={
            theme.palette.mode === "dark"
              ? "#40E8C8"
              : "#00A9C6"
          }
          comparison={{
            status: "negative",
            value: "-2.9%",
            text: "vs FY25",
          }}
        />

        {/* KPI 3 */}
        <KPICard
          label="MARKET VALUE GROWTH"
          value="+5.7%"
          accentColor={
            theme.palette.mode === "dark"
              ? "#E060C0"
              : "#BC2486"
          }
          comparison={{
            status: "positive",
            value: "category expanding",
            text: "",
          }}
        />
      </Box>

      {/* Future Category & SKU content */}
      <Box
        sx={{
          mt: 2,
          minHeight: 250,
        }}
      >
        {/* Category and SKU charts/tables will go here */}
      </Box>
    </Box>
  );
}