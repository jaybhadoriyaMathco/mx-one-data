import { Box, Chip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

import KPI from "../components/common/KPI/KPI";
import MarketPerformanceFilters from "../features/marketPerformance/filters/MarketPerformanceFilters";
import type { RootState } from "../store";

export function MarketPerformancePage() {
  const theme = useTheme();
  const { compareYears, comparePeriods } = useSelector(
    (state: RootState) => state.marketFilters,
  );

  const comparingItems = [...compareYears, ...comparePeriods];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 74px)",
        bgcolor: (t) =>
          t.palette.mode === "dark" ? "background.default" : "#FFF7F7",
        color: "text.primary",
      }}
    >
      <MarketPerformanceFilters />

      <Box
        component="main"
        sx={{ boxSizing: "border-box", px: 2.75, pt: 2.5, pb: 5 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.9,
            mb: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Market Performance
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 15 }}>
            ›
          </Typography>
          <Typography variant="body2" color="text.primary" fontWeight={600}>
            Executive View
          </Typography>
        </Box>

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
              sx={{ m: 0, fontSize: 22, fontWeight: 700, lineHeight: 1.3 }}
            >
              Executive View
            </Typography>
            <Typography sx={{ mt: 0.75, color: "text.secondary", fontSize: 12 }}>
              Strategic market health summary · All categories · Traditional
              channel · P08 2026 · RSV ($)
            </Typography>
          </Box>

          {comparingItems.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, pt: 0.5 }}>
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
          <KPI
            label="MARS SOM — TRADITIONAL"
            value="23.1%"
            accentColor={theme.palette.primary.main}
            comparison={{
              status: "positive",
              value: "+0.3pp",
              text: "vs FY25 · Traditional channel · total category",
            }}
          />

          <KPI
            label="CATEGORY VALUE GROWTH"
            value="+4.1%"
            accentColor={theme.palette.mode === "dark" ? "#E060C0" : "#BC2486"}
            comparison={{
              status: "positive",
              value: "YTD vs FY25",
            }}
            sparkline={{
              color: theme.palette.mode === "dark" ? "#E060C0" : "#BC2486",
              fill: true,
              data: [3.6, 3.8, 3.9, 3.7, 3.4, 3.8, 4.2, 4.5, 4.4, 4.1],
            }}
          />

          <KPI
            label="AVG STORES SELLING"
            value="5,329"
            accentColor={theme.palette.warning.main}
            comparison={{
              status: "positive",
              value: "+99 vs P12 2025",
            }}
            sparkline={{
              color: theme.palette.mode === "dark" ? "#40E8C8" : "#00DCFA",
              fill: true,
              data: [4800, 4920, 5000, 5050, 5100, 5180, 5220, 5260, 5280, 5329],
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}