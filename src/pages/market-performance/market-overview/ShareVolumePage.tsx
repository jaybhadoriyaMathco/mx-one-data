import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import KPICard from "../../../components/common/KPICard/KPICard";

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

export function ShareVolumePage() {
  const theme = useTheme();

  return (
    <Box sx={pageContainerSx}>
      <Box sx={{ mb: 2.5 }}>
        <Typography
          component="h1"
          sx={{
            fontSize: 22,
            fontWeight: 700,
            lineHeight: 1.3,
          }}
        >
          Share & Volume
        </Typography>

        <Typography
          sx={{
            mt: 0.75,
            color: "text.secondary",
            fontSize: 13,
          }}
        >
          All categories · All channels · P08 2026 · RSV ($)
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
          label="MARS SHARE OF MARKET"
          value="23.4%"
          accentColor={theme.palette.primary.main}
          comparison={{
            status: "neutral",
            value: "— flat vs LY",
            text: "· total category",
          }}
          footerContent={
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1px 1fr",
                alignItems: "stretch",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Modern
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: 27,
                    fontWeight: 700,
                    lineHeight: 1.1,
                  }}
                >
                  24.6%
                </Typography>

                <Typography
                  sx={{
                    mt: 0.75,
                    color: "success.main",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  +0.5pp
                </Typography>
              </Box>

              <Box
                sx={{
                  bgcolor: "divider",
                  mx: 2,
                }}
              />

              <Box>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Traditional
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: 27,
                    fontWeight: 700,
                    lineHeight: 1.1,
                  }}
                >
                  21.9%
                </Typography>

                <Typography
                  sx={{
                    mt: 0.75,
                    color: "text.secondary",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  0pp
                </Typography>
              </Box>
            </Box>
          }
        />

        <KPICard
          label="CATEGORY VALUE YTD"
          value="$32.5M"
          accentColor={
            theme.palette.mode === "dark"
              ? "#E060C0"
              : "#BC2486"
          }
          comparison={{
            status: "positive",
            value: "+6.0%",
            text: "vs FY25",
          }}
        />

        <KPICard
          label="VOLUME GROWTH"
          value="-0.7%"
          accentColor="#84BD00"
          comparison={{
            status: "negative",
            value: "Below value growth",
          }}
        />
      </Box>
    </Box>
  );
}