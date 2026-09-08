import { useState, type ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface BarLabelConfig {
  text: string;
  color?: string;
}

export interface BarChartSeries {
  name: string;
  data: number[];
  color: string;
  colors?: string[];
  barLabels?: BarLabelConfig[];
}

export interface BarChartLegendItem {
  name: string;
  color: string;
}

interface AxisConfig {
  min?: number;
  max?: number;
  interval?: number;
  formatter?: (value: number) => string;
}

interface BarChartProps {
  title?: string;
  subtitle?: string;
  headerActions?: ReactNode;
  infoBanner?: ReactNode;

  xAxisData: string[];
  xAxisName?: string;
  yAxisName?: string;

  series: BarChartSeries[];
  legendItems?: BarChartLegendItem[];

  yAxis?: AxisConfig;

  height?: number;
  barMaxWidth?: number;
  horizontal?: boolean;

  showLegend?: boolean;
  showContainer?: boolean;
}

export function BarChart({
  title,
  subtitle,
  headerActions,
  infoBanner,
  xAxisData,
  xAxisName,
  yAxisName,
  series,
  legendItems,
  yAxis,
  height = 250,
  barMaxWidth = 155,
  horizontal = false,
  showLegend = true,
  showContainer = true,
}: BarChartProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);

  const handleLegendClick = (seriesName: string) => {
    setHiddenSeries((previous) =>
      previous.includes(seriesName)
        ? previous.filter((name) => name !== seriesName)
        : [...previous, seriesName],
    );
  };

  const visibleSeries = series.filter(
    (item) => !hiddenSeries.includes(item.name),
  );

  const axisTextColor = isDark ? "#B8B8C2" : "#666666";
  const axisNameColor = isDark ? "#C7C7D0" : "#666666";
  const gridColor = isDark ? "#35353D" : "#EAEAEA";
  const axisLineColor = isDark ? "#777783" : "#B8B8B8";

  const getSeriesColor = (color: string) => {
    if (!isDark) {
      return color;
    }

    const darkModeColors: Record<string, string> = {
      "#1A237E": "#625BFF",
      "#0000A0": "#625BFF",
      "#000099": "#625BFF",
      "#BC2486": "#D94FA8",
      "#84BD00": "#A6D900",
      "#00A9C6": "#28C7E5",
      "#22D3EE": "#35D9F5",
      "#FF7900": "#FF9F43",
      "#FFA500": "#FFB52E",
      "#FFC000": "#FFC52E",
    };

    return darkModeColors[color.toUpperCase()] ?? color;
  };

  const valueAxis = {
    type: "value" as const,
    name: horizontal ? xAxisName : yAxisName,
    nameLocation: "middle" as const,
    nameGap: horizontal ? 28 : 45,

    min: yAxis?.min,
    max: yAxis?.max,
    interval: yAxis?.interval,

    nameTextStyle: {
      color: axisNameColor,
      fontSize: 12,
      fontWeight: 500,
    },

    axisLine: {
      show: false,
    },

    axisTick: {
      show: false,
    },

    axisLabel: {
      color: axisTextColor,
      fontSize: 12,
      fontWeight: 500,
      margin: 10,

      formatter: (value: number) =>
        yAxis?.formatter
          ? yAxis.formatter(value)
          : String(value),
    },

    splitLine: {
      show: true,
      lineStyle: {
        color: gridColor,
        width: 1,
      },
    },
  };

  const categoryAxis = {
    type: "category" as const,
    data: xAxisData,

    name: horizontal ? yAxisName : xAxisName,
    nameLocation: "middle" as const,
    nameGap: horizontal ? 120 : 28,

    inverse: horizontal,

    axisLine: {
      lineStyle: {
        color: axisLineColor,
        width: 1,
      },
    },

    axisTick: {
      show: false,
    },

    axisLabel: {
      color: axisTextColor,
      fontSize: 12,
      fontWeight: 500,
      margin: 12,
    },
  };

  const option: EChartsOption = {
    tooltip: {
      trigger: "item",

      backgroundColor: isDark
        ? "#24242C"
        : "#FFFFFF",

      borderColor: isDark
        ? "#454550"
        : "#D9D9D9",

      borderWidth: 1,

      textStyle: {
        color: isDark
          ? "#F2F2F5"
          : "#222222",
        fontSize: 12,
      },

      formatter: (params: any) => {
        const formattedValue = yAxis?.formatter
          ? yAxis.formatter(Number(params.value))
          : params.value;

        return `
          <div style="font-size:12px;">
            <div style="font-weight:600;margin-bottom:5px;">
              ${params.name}
            </div>
            <div>
              ${params.seriesName}: ${formattedValue}
            </div>
          </div>
        `;
      },
    },

    grid: {
      left: horizontal ? 55 : 55,
      right: horizontal ? 40 : 25,
      top: 28,
      bottom: horizontal ? 45 : 55,
      containLabel: true,
    },

    xAxis: horizontal
      ? valueAxis
      : categoryAxis,

    yAxis: horizontal
      ? categoryAxis
      : valueAxis,

    series: visibleSeries.map((item) => {

      return {
        name: item.name,

        type: "bar" as const,

        data: item.barLabels
          ? item.data.map((value, index) => ({
              value,

              label: {
                show: true,

                position: horizontal
                  ? ("right" as const)
                  : ("top" as const),

                formatter:
                  item.barLabels?.[index]?.text ?? "",

                color:
                  item.barLabels?.[index]?.color ??
                  axisTextColor,

                fontSize: 11,
                fontWeight: 600,
              },
            }))
          : item.data,

        itemStyle: {
          color: (params: any) => {
            const originalColor =
              item.colors?.[params.dataIndex] ??
              item.color;

            return getSeriesColor(originalColor);
          },

          borderRadius: horizontal
            ? [0, 5, 5, 0]
            : [5, 5, 0, 0],
        },

        barMaxWidth,

        emphasis: {
          disabled: true,
        },

        blur: {
          itemStyle: {
            opacity: 1,
          },
        },
      };
    }),

    animationDuration: 400,
  };

  const legendEntries = legendItems ?? series;
  const legendIsInteractive = !legendItems;

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: {
            xs: "stretch",
            sm: "flex-start",
          },
          justifyContent: "space-between",
          gap: 2,
          mb: 1,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          {title && (
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: "text.primary",
                lineHeight: 1.3,
                mb: subtitle ? 0.4 : 0,
              }}
            >
              {title}
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

        {headerActions && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
              flexShrink: 0,
              ml: "auto",
            }}
          >
            {headerActions}
          </Box>
        )}
      </Box>

      {infoBanner && (
        <Box sx={{ mb: 1.5 }}>
          {infoBanner}
        </Box>
      )}

      {showLegend && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            gap: 1.5,
            mb: 1,
          }}
        >
          {legendEntries.map((item) => {
            const isHidden =
              hiddenSeries.includes(item.name);

            const legendColor = getSeriesColor(item.color);

            return (
              <Box
                key={item.name}
                onClick={
                  legendIsInteractive
                    ? () =>
                        handleLegendClick(item.name)
                    : undefined
                }
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.6,

                  cursor: legendIsInteractive
                    ? "pointer"
                    : "default",

                  opacity: isHidden ? 0.55 : 1,

                  userSelect: "none",

                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    bgcolor: legendColor,
                    borderRadius: 0.3,
                    flexShrink: 0,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: isDark
                      ? "#C8C8D0"
                      : "text.secondary",

                    textDecoration: isHidden
                      ? "line-through"
                      : "none",
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}

      <ReactECharts
        option={option}
        style={{
          width: "100%",
          height,
        }}
        notMerge
        lazyUpdate
      />
    </>
  );

  if (!showContainer) {
    return (
      <Box
        sx={{
          width: "100%",
          minWidth: 0,
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        p: 2,
        boxSizing: "border-box",
      }}
    >
      {content}
    </Box>
  );
}