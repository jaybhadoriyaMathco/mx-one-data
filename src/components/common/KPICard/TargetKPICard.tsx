import { Box, LinearProgress, Typography } from "@mui/material";

interface TargetKPICardProps {
  label: string;
  value: string;
  subtitle?: string;
  comparison?: string;
  comparisonStatus?: "positive" | "negative" | "neutral";
  target: string;
  variance: string;
  varianceStatus?: "positive" | "negative";
  progress: number;
  accentColor: string;
}

export function TargetKPICard({
  label,
  value,
  subtitle,
  comparison,
  comparisonStatus = "neutral",
  target,
  variance,
  varianceStatus = "negative",
  progress,
  accentColor,
}: TargetKPICardProps) {
  const comparisonColor =
    comparisonStatus === "positive"
      ? "#1F7A52"
      : comparisonStatus === "negative"
        ? "#D32F2F"
        : "text.secondary";

  const varianceColor =
    varianceStatus === "positive" ? "#1F7A52" : "#D32F2F";

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: 175,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      {/* Accent Line */}
      <Box
        sx={{
          height: 4,
          width: "100%",
          bgcolor: accentColor,
        }}
      />

      {/* Card Content */}
      <Box
        sx={{
          px: 2.5,
          pt: 2,
          pb: 2,
        }}
      >
        {/* Label */}
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.7px",
            color: "text.secondary",
            textTransform: "uppercase",
          }}
        >
          {label}
        </Typography>

        {/* Main Value */}
        <Typography
          sx={{
            mt: 0.75,
            fontSize: 30,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "text.primary",
          }}
        >
          {value}
        </Typography>

        {/* Comparison / Subtitle */}
        <Box
          sx={{
            mt: 0.75,
            minHeight: 20,
          }}
        >
          {comparison && (
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 600,
                color: comparisonColor,
              }}
            >
              {comparison}
            </Typography>
          )}

          {subtitle && (
            <Typography
              sx={{
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Divider */}
        <Box
          sx={{
            mt: 1,
            borderTop: "1px dashed",
            borderColor: "divider",
          }}
        />

        {/* Target Row */}
        <Box
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "text.secondary",
              textTransform: "uppercase",
            }}
          >
            Target {target}
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: varianceColor,
            }}
          >
            {variance}
          </Typography>
        </Box>

        {/* Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={Math.min(progress, 100)}
          sx={{
            mt: 1,
            height: 4,
            borderRadius: 4,
            bgcolor: "action.hover",

            "& .MuiLinearProgress-bar": {
              borderRadius: 4,
              bgcolor:
                varianceStatus === "positive"
                  ? "#2E8B57"
                  : "#F44336",
            },
          }}
        />
      </Box>
    </Box>
  );
}