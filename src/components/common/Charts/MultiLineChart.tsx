import { Box, Button, Typography } from "@mui/material";
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
  subtitle?: string;

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

  leftAxis?: AxisConfig;
  rightAxis?: AxisConfig;

  height?: number;
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
  height = 280,
}: MultiLineChartProps) {
  const hasRightAxis = series.some(
    (item) => item.yAxisIndex === 1,
  );

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
        color: "#666",
        fontSize: 12,
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
        color: "#666",
        fontSize: 11,
        margin: 10,

        formatter: (value: number) =>
            leftAxis?.formatter
            ? leftAxis.formatter(value)
            : String(value),
        },

        splitLine: {
        show: true,
        },
    },
];

if (hasRightAxis) {
  yAxis.push({
    type: "value",

    name: rightAxisName,

    position: "right",

    // Vertically center the right axis label
    nameLocation: "middle",
    nameRotate: 270,
    nameGap: 55,

    min: rightAxis?.min,
    max: rightAxis?.max,
    interval: rightAxis?.interval,

    nameTextStyle: {
      color: "#666",
      fontSize: 12,
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
      color: "#666",
      fontSize: 11,

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
            const xValue = params.name;
            const yValue = params.value;

            return `
            <div style="font-size: 12px;">
                <div style="font-weight: 600; margin-bottom: 4px;">
                ${xValue}
                </div>

                <div>
                ${params.seriesName}: ${yValue}
                </div>
            </div>
            `;
        },
    },

    grid: {
      left: 45,
      right: hasRightAxis ? 55 : 20,
      top: 25,
      bottom: 45,
      containLabel: true,
    },

    xAxis: {
      type: "category",
      data: xAxisData,

      name: xAxisName,
      nameLocation: "middle",
      nameGap: 30,

      axisLine: {
        lineStyle: {
          color: "#B8B8B8",
        },
      },

      axisTick: {
        show: false,
      },

      axisLabel: {
        color: "#666",
        fontSize: 11,
      },
    },

    yAxis,

    series: series.map((item, index) => ({
    name: item.name,
    type: "line" as const,
    data: item.data,
    smooth: true,
    yAxisIndex: item.yAxisIndex ?? 0,

    lineStyle: {
        width: 2.5,
        type: "solid",
        color: item.color,
    },

    itemStyle: {
        color: item.color,
    },

    symbol: "circle",
    symbolSize: 6,

    areaStyle:
    item.fill === true || item.area === true
        ? {
            opacity: 0.16,
            color: item.color,
        }
        : undefined,
    })),

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
      {/* Header */}
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
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              sx={{
                mt: 0.4,
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              {subtitle}
            </Typography>
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
                borderColor: "divider",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab;

                return (
                  <Button
                    key={tab}
                    onClick={() => onTabChange?.(tab)}
                    sx={{
                      minWidth: 82,
                      borderRadius: 0,
                      textTransform: "none",
                      fontSize: 12,

                      color: isActive
                        ? "#FFFFFF"
                        : "text.secondary",

                      bgcolor: isActive
                        ? "primary.main"
                        : "transparent",

                      "&:hover": {
                        bgcolor: isActive
                          ? "primary.dark"
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
        </Box>
      </Box>

      {/* Legend */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          mb: 0.5,
        }}
      >
        {series.map((item) => (
          <Box
            key={item.name}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.6,
            }}
          >
            <Box
            sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: item.color,
                flexShrink: 0,
            }}
            />

            <Typography
              sx={{
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Chart */}
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