import { Box, alpha, useTheme } from "@mui/material";

export function TableSegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      role="group"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.14)"}`,
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: isDark ? theme.palette.background.paper : "#FFFFFF",
        boxShadow: isDark ? "inset 0 1px 0 rgba(255,255,255,0.03)" : "none",
        flexWrap: "wrap",
      }}
    >
      {options.map((option) => {
        const active = option === value;

        return (
          <Box
            key={option}
            component="button"
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            sx={{
              appearance: "none",
              border: 0,
              borderRight: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
              m: 0,
              px: 1.25,
              py: 0.4,
              minHeight: 26,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "inherit",
              fontSize: 11,
              fontWeight: active ? 600 : 500,
              lineHeight: 1.1,
              letterSpacing: "0.01em",
              cursor: "pointer",
              whiteSpace: "nowrap",
              textAlign: "center",
              color: active
                ? theme.palette.getContrastText(theme.palette.primary.main)
                : isDark
                  ? theme.palette.text.primary
                  : "#3F3F46",
              bgcolor: active
                ? theme.palette.primary.main
                : isDark
                  ? alpha(theme.palette.background.default, 0.7)
                  : "#F7F7F9",
              transition: "all 0.15s ease",
              "&:last-child": { borderRight: 0 },
              "&:hover": {
                bgcolor: active
                  ? theme.palette.primary.dark
                  : isDark
                    ? alpha(theme.palette.action.hover, 0.12)
                    : alpha(theme.palette.primary.main, 0.04),
                color: active
                  ? theme.palette.getContrastText(theme.palette.primary.dark)
                  : isDark
                    ? theme.palette.text.primary
                    : "#1F2937",
              },
            }}
          >
            {option}
          </Box>
        );
      })}
    </Box>
  );
}
