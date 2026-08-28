import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import type { KPIProps } from "./types";
import KPISparkline from "./KPISparkline";

function KPI({
  label,
  value,
  comparison,
  accentColor,
  sparkline,
  className = "",
}: KPIProps) {
  const comparisonColor =
    comparison?.status === "positive"
      ? "success.main"
      : comparison?.status === "negative"
        ? "error.main"
        : "text.secondary";

  return (
    <Box
      className={className}
      sx={(theme) => ({
        position: "relative",
        width: "100%",
        height: 194,
        overflow: "hidden",
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
          height: 190,
        },
      })}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 4,
          bgcolor: accentColor ?? "primary.main",
          borderRadius: "12px 12px 0 0",
        }}
      />

      <Box
        sx={{
          position: "relative",
          height: "100%",
          boxSizing: "border-box",
          px: 2.5,
          pt: 2.25,
          pb: 1.75,
        }}
      >
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
            mt: 1.1,
            color: "text.primary",
            fontSize: 30,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.3px",
          }}
        >
          {value}
        </Typography>

        {comparison && (
          <Box
            sx={{
              mt: 0.75,
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 0.5,
              fontSize: 12,
              lineHeight: 1.4,
            }}
          >
            <Typography
              component="span"
              sx={{ color: comparisonColor, fontSize: 12, fontWeight: 600 }}
            >
              {comparison.value}
            </Typography>

            {comparison.text && (
              <Typography
                component="span"
                sx={{ color: "text.secondary", fontSize: 12, fontWeight: 400 }}
              >
                {comparison.text}
              </Typography>
            )}
          </Box>
        )}

        {sparkline && (
          <Box
            sx={{
              position: "absolute",
              left: 20,
              right: 20,
              bottom: 15,
              height: 62,
              pointerEvents: "none",
              "& svg": {
                display: "block",
                width: "100%",
                height: "100%",
                overflow: "visible",
              },
            }}
          >
            <KPISparkline
              data={sparkline.data}
              color={sparkline.color}
              fill={sparkline.fill}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default KPI;