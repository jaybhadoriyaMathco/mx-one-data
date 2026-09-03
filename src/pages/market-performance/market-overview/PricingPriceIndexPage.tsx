import { Box, Button, Typography } from "@mui/material";
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

export function PricingPriceIndexPage() {
  const theme = useTheme();

  return (
    <Box sx={pageContainerSx}>
      {/* Page Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
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
              color: "text.secondary",
              fontSize: 12,
            }}
          >
            Avg selling price · All categories · All channels · P06 2026
          </Typography>
        </Box>

        {/* SRM Dashboard Button */}
        <Button
          variant="outlined"
          endIcon={<span>🔒</span>}
          sx={{
            height: 34,
            px: 1.75,
            borderRadius: 2,
            textTransform: "none",
            fontSize: 13,
            fontWeight: 600,
            borderColor: "divider",
            color: "primary.main",
            bgcolor: "background.paper",
          }}
        >
          Open SRM Dashboard
        </Button>
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
          label="MARS DOG DRY AVG PRICE"
          value="$862"
          accentColor={theme.palette.primary.main}
          comparison={{
            status: "neutral",
            value: "~Flat",
            text: "W4 vs W3 · 66 stores",
          }}
        />

        {/* KPI 2 */}
        <KPICard
          label="MARS CAT DRY AVG PRICE"
          value="$545"
          accentColor={
            theme.palette.mode === "dark"
              ? "#40E8C8"
              : "#00A9C6"
          }
          comparison={{
            status: "positive",
            value: "+6 MXN",
            text: "W4 vs W3",
          }}
        />

        {/* KPI 3 */}
        <KPICard
          label="STORES SURVEYED"
          value="69"
          accentColor={
            theme.palette.mode === "dark"
              ? "#E060C0"
              : "#BC2486"
          }
          comparison={{
            status: "neutral",
            value: "P12 2025 · All Areas",
          }}
        />
      </Box>

      {/* Future dashboard content */}
      <Box
        sx={{
          mt: 2,
          minHeight: 250,
        }}
      >
        {/* Charts and tables for Pricing & Price Index */}
      </Box>
    </Box>
  );
}