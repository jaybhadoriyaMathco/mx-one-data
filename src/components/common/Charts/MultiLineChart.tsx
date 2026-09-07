import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import ReactECharts from "echarts-for-react";
import type { EChartsOption, YAXisOption } from "echarts";

export interface MultiLineSeries {
  name: string;
  data: number[];
  color: string;
  yAxisIndex?: number;
  dashed?: boolean;
  area?: boolean;
  fill?: boolean;
}

interface MultiLineChartProps {
  title: string;
  subtitle?: React.ReactNode;

  xAxisData: string[];
  xAxisName?: string;

  series: MultiLineSeries[];

  leftAxisName?: string;
  rightAxisName?: string;

  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;

  actionLabel?: string;
  onActionClick?: () => void;

  headerActions?: React.ReactNode;

  leftAxis?: AxisConfig;
  rightAxis?: AxisConfig;

  height?: number;
  showLegend?: boolean;

  tabMinWidth?: number;
}

interface AxisConfig {
  min?: number;
  max?: number;
  interval?: number;
  formatter?: (value: number) => string;
}

export function MultiLineChart({
  title,
  subtitle,
  leftAxis,
  rightAxis,
  xAxisData,
  xAxisName,
  series,
  leftAxisName,
  rightAxisName,
  tabs,
  activeTab,
  onTabChange,
  actionLabel,
  onActionClick,
  headerActions,
  height = 280,
  showLegend = true,
  tabMinWidth = 65,
}: MultiLineChartProps) {

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [visibleSeries, setVisibleSeries] = useState<
    Record<string, boolean>
  >(() =>
    series.reduce(
      (acc, item) => {
        acc[item.name] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

  const toggleSeries = (seriesName: string) => {
    setVisibleSeries((previous) => ({
      ...previous,
      [seriesName]: !previous[seriesName],
    }));
  };

  const hasRightAxis = series.some(
    (item) => item.yAxisIndex === 1,
  );

  const axisTextColor = isDark ? "#B8B8C2" : "#666666";
  const axisNameColor = isDark ? "#C7C7D0" : "#666666";
  const gridColor = isDark ? "#35353D" : "#E5E5E5";
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

  const yAxis: YAXisOption[] = [
    {
      type: "value",

      name: leftAxisName,

      nameLocation: "middle",
      nameRotate: 90,
      nameGap: 48,

      min: leftAxis?.min,
      max: leftAxis?.max,
      interval: leftAxis?.interval,

      nameTextStyle: {
        color: axisNameColor,
        fontSize: 12,
        fontWeight: 500,
        align: "center",
        verticalAlign: "middle",
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
          leftAxis?.formatter
            ? leftAxis.formatter(value)
            : String(value),
      },

      splitLine: {
        show: true,
        lineStyle: {
          color: gridColor,
          width: 1,
        },
      },
    },
  ];

  if (hasRightAxis) {
    yAxis.push({
      type: "value",

      name: rightAxisName,
      position: "right",

      nameLocation: "middle",
      nameRotate: 270,
      nameGap: 55,

      min: rightAxis?.min,
      max: rightAxis?.max,
      interval: rightAxis?.interval,

      nameTextStyle: {
        color: axisNameColor,
        fontSize: 12,
        fontWeight: 500,
        align: "center",
        verticalAlign: "middle",
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
          rightAxis?.formatter
            ? rightAxis.formatter(value)
            : String(value),
      },

      splitLine: {
        show: false,
      },
    });
  }

  const option: EChartsOption = {
    tooltip: {
      trigger: "item",

      formatter: (params: any) => {
        return `
          <div style="font-size:12px;">
            <div style="font-weight:600;margin-bottom:6px;">
              ${params.name}
            </div>

            <div>
              <span
                style="
                  display:inline-block;
                  width:8px;
                  height:8px;
                  border-radius:50%;
                  background:${params.color};
                  margin-right:6px;
                "
              ></span>
              ${params.seriesName}: ${params.value}
            </div>
          </div>
        `;
      },
    },

    grid: {
      left: 55,
      right: hasRightAxis ? 70 : 25,
      top: 35,
      bottom: 55,
      containLabel: true,
    },

    xAxis: {
      type: "category",
      data: xAxisData,
      boundaryGap: false,

      name: xAxisName,
      nameLocation: "middle",
      nameGap: 32,

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

      splitLine: {
        show: false,
      },
    },

    yAxis,

    series: series
      .filter(
        (item) => visibleSeries[item.name] !== false,
      )
      .map((item) => {
        const chartColor = getSeriesColor(item.color);

        return {
          name: item.name,
          type: "line" as const,

          data: item.data,

          smooth: true,

          yAxisIndex: item.yAxisIndex ?? 0,

          lineStyle: {
            width: 2.5,
            type: item.dashed ? "dashed" : "solid",
            color: chartColor,
          },

          itemStyle: {
            color: chartColor,
          },

          symbol: "circle",
          symbolSize: 7,

          showSymbol: true,

          emphasis: {
            focus: "none",

            lineStyle: {
              width: 2.5,
              color: chartColor,
            },

            itemStyle: {
              color: chartColor,
            },

            scale: false,
          },

          blur: {
            lineStyle: {
              opacity: 1,
            },

            itemStyle: {
              opacity: 1,
            },
          },

          areaStyle:
            item.fill === true || item.area === true
              ? {
                  opacity: 0.16,
                  color: chartColor,
                }
              : undefined,
        };
      }),

    animationDuration: 400,
  };

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2,
          mb: 1.5,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Box
              sx={{
                mt: 0.4,
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              {subtitle}
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexShrink: 0,
          }}
        >
          {actionLabel && (
            <Button
              size="small"
              onClick={onActionClick}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: 12,
                minWidth: "auto",
                px: 1,
              }}
            >
              {actionLabel}
            </Button>
          )}

          {tabs && tabs.length > 0 && (
            <Box
              sx={{
                display: "flex",
                border: "1px solid",
                borderColor: isDark
                  ? "#3A3A45"
                  : "divider",
                borderRadius: "12px",
                overflow: "hidden",
                height: 30,
              }}
            >
              {tabs.map((tab, index) => {
                const isActive = activeTab === tab;
                const isLast = index === tabs.length - 1;

                return (
                  <Button
                    key={tab}
                    onClick={() => onTabChange?.(tab)}
                    sx={{
                      minWidth: tabMinWidth,
                      height: 30,
                      px: 1.25,

                      borderRadius: 0,
                      textTransform: "none",

                      fontSize: 12,
                      fontWeight: 500,

                      color: isActive
                        ? "#FFFFFF"
                        : isDark
                          ? "#C4C4CC"
                          : "#555555",

                      bgcolor: isActive
                        ? theme.palette.primary.main
                        : "transparent",

                      borderRight:
                        !isLast
                          ? "1px solid"
                          : "none",

                      borderColor: isDark
                        ? "#3A3A45"
                        : "divider",

                      "&:hover": {
                        bgcolor: isActive
                          ? theme.palette.primary.dark
                          : isDark
                            ? "rgba(255,255,255,0.06)"
                            : "action.hover",
                      },
                    }}
                  >
                    {tab}
                  </Button>
                );
              })}
            </Box>
          )}

          {headerActions}
        </Box>
      </Box>

      {showLegend && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            gap: 1.5,
            mb: 0.5,
          }}
        >
          {series.map((item) => {
            const isVisible =
              visibleSeries[item.name] !== false;

            const chartColor = getSeriesColor(item.color);

            return (
              <Box
                key={item.name}
                onClick={() =>
                  toggleSeries(item.name)
                }
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.6,
                  cursor: "pointer",
                  userSelect: "none",

                  opacity: isVisible ? 1 : 0.55,

                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: chartColor,
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
                    textDecoration: isVisible
                      ? "none"
                      : "line-through",
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
    </Box>
  );
}