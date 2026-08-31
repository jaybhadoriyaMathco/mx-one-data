import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import type { KPICardProps, KPIStatus } from "./types";
import KPITrendChart from "./KPITrendChart";

function getStatusColor(status?: KPIStatus) {
  if (status === "positive") return "success.main";
  if (status === "negative") return "error.main";

  return "text.secondary";
}

function KPICard({
  label,
  value,
  comparison,
  accentColor,
  chart,
  breakdown,
  showChart = false,
  showComparison = true,
  footerContent,
  className = "",
  minHeight,
}: KPICardProps) {
  const comparisonColor = getStatusColor(comparison?.status);

  return (
    <Box
      className={className}
      sx={(theme) => ({
        position: "relative",
        width: "100%",
        minHeight: minHeight ?? (showChart || footerContent ? 194 : 145),
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        color: "text.primary",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "12px",
        boxShadow:
          theme.palette.mode === "dark"
            ? "none"
            : "0 1px 2px rgba(0, 0, 0, 0.06)",

        "&:hover": {
          boxShadow:
            theme.palette.mode === "dark"
              ? `0 0 0 1px ${alpha(theme.palette.primary.main, 0.24)}`
              : "0 4px 8px -2px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.05)",
        },

        [theme.breakpoints.down("sm")]: {
          minHeight: 190,
        },
      })}
    >
      {/* Accent line */}
      <Box
        sx={{
          width: "100%",
          height: 4,
          flexShrink: 0,
          bgcolor: accentColor ?? "primary.main",
        }}
      />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          px: 2.5,
          pt: 2.25,
          pb: 1.75,
        }}
      >
        {/* KPI information */}
        <Box>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.4,
              letterSpacing: "0.2px",
              textTransform: "uppercase",
            }}
          >
            {label}
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "text.primary",
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.3px",
            }}
          >
            {value}
          </Typography>

          {showComparison && comparison && (
            <Box
              sx={{
                mt: 0.75,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              <Typography
                component="span"
                sx={{
                  color: comparisonColor,
                  fontSize: 12,
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}
              >
                {comparison.value}
              </Typography>

              {comparison.text && (
                <Typography
                  component="span"
                  sx={{
                    color: "text.secondary",
                    fontSize: 12,
                    fontWeight: 400,
                    lineHeight: 1.4,
                  }}
                >
                  {comparison.text}
                </Typography>
              )}
            </Box>
          )}
        </Box>

        {/* Modern / Traditional or other breakdown */}
        {breakdown && breakdown.items.length > 0 && (
          <Box
            sx={{
              mt: 1.5,
              display: "flex",
              alignItems: "stretch",
            }}
          >
            {breakdown.items.map((item, index) => (
              <Box
                key={`${item.label}-${index}`}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  px: index === 0 ? 0 : 2,

                  borderLeft:
                    index === 0
                      ? "none"
                      : "1px solid",

                  borderColor: "divider",
                }}
              >
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 11,
                    fontWeight: 600,
                    lineHeight: 1.4,
                    letterSpacing: "0.3px",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    color: "text.primary",
                    fontSize: 24,
                    fontWeight: 700,
                    lineHeight: 1.15,
                  }}
                >
                  {item.value}
                </Typography>

                {item.comparison && (
                  <Typography
                    sx={{
                      mt: 0.5,
                      color: getStatusColor(item.status),
                      fontSize: 12,
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.comparison}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        )}

        {/* Bottom chart / footer */}
        {(showChart && chart) || footerContent ? (
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              mt: 1.5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {showChart && chart && (
              <Box
                sx={{
                  width: "100%",
                  height: 62,
                  minHeight: 62,
                  pointerEvents: "none",
                }}
              >
                <KPITrendChart
                  data={chart.data}
                  color={chart.color}
                  fill={chart.fill}
                />
              </Box>
            )}

            {footerContent && (
              <Box
                sx={{
                  width: "100%",
                }}
              >
                {footerContent}
              </Box>
            )}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default KPICard;