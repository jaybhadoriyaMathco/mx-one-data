import { Box, Chip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

import KPICard from "../../components/common/KPICard/KPICard";
import { ModuleBreadcrumbs } from "../../components/common/Breadcrumbs/ModuleBreadcrumbs";
import type { RootState } from "../../store";

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

export function ExecutiveViewPage() {
  const theme = useTheme();

  const { compareYears, comparePeriods } = useSelector(
    (state: RootState) => state.marketFilters,
  );

  const comparingItems = [...compareYears, ...comparePeriods];

  return (
    <Box sx={pageContainerSx}>
      <ModuleBreadcrumbs />

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
            Strategic market health summary · All categories · Traditional
            channel · P08 2026 · RSV ($)
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
            theme.palette.mode === "dark" ? "#E060C0" : "#BC2486"
          }
          comparison={{
            status: "positive",
            value: "YTD vs FY25",
          }}
          showChart
          chart={{
            color: theme.palette.mode === "dark" ? "#E060C0" : "#BC2486",
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
            color: theme.palette.mode === "dark" ? "#40E8C8" : "#00DCFA",
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
    </Box>
  );
}