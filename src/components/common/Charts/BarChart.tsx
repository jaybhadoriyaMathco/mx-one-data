import { useState, type ReactNode } from "react";
import { Box, Typography } from "@mui/material";
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

  const valueAxis = {
    type: "value" as const,
    name: horizontal ? xAxisName : yAxisName,
    nameLocation: "middle" as const,
    nameGap: horizontal ? 28 : 45,
    min: yAxis?.min,
    max: yAxis?.max,
    interval: yAxis?.interval,
    nameTextStyle: {
      color: "#666",
      fontSize: 12,
    },
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: "#666",
      fontSize: 11,
      formatter: (value: number) =>
        yAxis?.formatter ? yAxis.formatter(value) : String(value),
    },
    splitLine: {
      show: true,
      lineStyle: { color: "#EAEAEA" },
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
      lineStyle: { color: "#B8B8B8" },
    },
    axisTick: { show: false },
    axisLabel: {
      color: "#666",
      fontSize: 11,
    },
  };

  const option: EChartsOption = {
    tooltip: {
      trigger: "item",
      formatter: (params: any) => {
        const formattedValue = yAxis?.formatter
          ? yAxis.formatter(Number(params.value))
          : params.value;

        return `
          <div style="font-size: 12px;">
            <div style="font-weight: 600; margin-bottom: 4px;">
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
      left: horizontal ? 40 : 50,
      right: horizontal ? 36 : 20,
      top: 28,
      bottom: 45,
      containLabel: true,
    },
    xAxis: horizontal ? valueAxis : categoryAxis,
    yAxis: horizontal ? categoryAxis : valueAxis,
    series: visibleSeries.map((item) => ({
      name: item.name,
      type: "bar" as const,
      data: item.barLabels
        ? item.data.map((value, index) => ({
            value,
            label: {
              show: true,
              position: horizontal ? ("right" as const) : ("top" as const),
              formatter: item.barLabels?.[index]?.text ?? "",
              color: item.barLabels?.[index]?.color ?? "#666666",
              fontSize: 11,
              fontWeight: 600,
            },
          }))
        : item.data,
      itemStyle: {
        color: (params: any) => item.colors?.[params.dataIndex] ?? item.color,
        borderRadius: horizontal ? [0, 5, 5, 0] : [5, 5, 0, 0],
      },
      barMaxWidth,
      emphasis: { focus: "series" },
    })),
    animationDuration: 400,
  };

  const legendEntries = legendItems ?? series;
  const legendIsInteractive = !legendItems;

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "stretch", sm: "flex-start" },
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
            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
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

      {infoBanner && <Box sx={{ mb: 1.5 }}>{infoBanner}</Box>}

      {showLegend && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
            mb: 1,
          }}
        >
          {legendEntries.map((item) => {
            const isHidden = hiddenSeries.includes(item.name);

            return (
              <Box
                key={item.name}
                onClick={
                  legendIsInteractive
                    ? () => handleLegendClick(item.name)
                    : undefined
                }
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.6,
                  cursor: legendIsInteractive ? "pointer" : "default",
                  opacity: isHidden ? 0.5 : 1,
                  userSelect: "none",
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    bgcolor: item.color,
                    borderRadius: 0.3,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "text.secondary",
                    textDecoration: isHidden ? "line-through" : "none",
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
        style={{ width: "100%", height }}
        notMerge
        lazyUpdate
      />
    </>
  );

  if (!showContainer) {
    return <Box sx={{ width: "100%", minWidth: 0 }}>{content}</Box>;
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