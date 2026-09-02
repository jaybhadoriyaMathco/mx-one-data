import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import KPICard from "../../components/common/KPICard/KPICard";
import { ModuleBreadcrumbs } from "../../components/common/Breadcrumbs/ModuleBreadcrumbs";

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

      {/* Future FACT vs FCST content */}
      <Box
        sx={{
          mt: 2,
          minHeight: 250,
        }}
      >
        {/* FACT vs FCST charts and tables*/}
      </Box>
    </Box>
  );
}