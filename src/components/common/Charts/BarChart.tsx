import { useState } from "react";
import { Box, Typography } from "@mui/material";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

export interface BarChartSeries {
  name: string;
  data: number[];
  color: string;
}

interface BarChartProps {
  title: string;

  xAxisData: string[];
  xAxisName?: string;
  yAxisName?: string;

  series: BarChartSeries[];

  height?: number;
}

export function BarChart({
  title,
  xAxisData,
  xAxisName,
  yAxisName,
  series,
  height = 250,
}: BarChartProps) {
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);

  const handleLegendClick = (seriesName: string) => {
    setHiddenSeries((previous) => {
      if (previous.includes(seriesName)) {
        return previous.filter((name) => name !== seriesName);
      }

      return [...previous, seriesName];
    });
  };

  const visibleSeries = series.filter(
    (item) => !hiddenSeries.includes(item.name),
  );

  const option: EChartsOption = {
    tooltip: {
      trigger: "item",

      formatter: (params: any) => {
        return `
          <div style="font-size: 12px;">
            <div style="font-weight: 600; margin-bottom: 4px;">
              ${params.name}
            </div>

            <div>
              ${params.seriesName}: ${params.value}
            </div>
          </div>
        `;
      },
    },

    grid: {
      left: 45,
      right: 20,
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

    yAxis: {
      type: "value",

      name: yAxisName,
      nameLocation: "middle",
      nameGap: 45,

      nameTextStyle: {
        color: "#666",
        fontSize: 12,
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
      },

      splitLine: {
        show: true,
      },
    },

    series: visibleSeries.map((item) => ({
      name: item.name,

      type: "bar" as const,

      data: item.data,

      itemStyle: {
        color: item.color,
      },

      barMaxWidth: 32,

      emphasis: {
        focus: "series",
      },
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
      {/* Title */}
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 600,
          mb: 1.5,
        }}
      >
        {title}
      </Typography>

      {/* Clickable Legend */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1.5,
          mb: 0.5,
        }}
      >
        {series.map((item) => {
          const isHidden = hiddenSeries.includes(item.name);

          return (
            <Box
              key={item.name}
              onClick={() => handleLegendClick(item.name)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.6,
                cursor: "pointer",
                opacity: isHidden ? 0.5 : 1,
                userSelect: "none",
              }}
            >
              {/* Legend color box */}
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  bgcolor: item.color,
                  border: "1px solid",
                  borderColor: item.color,
                }}
              />

              {/* Legend text */}
              <Typography
                sx={{
                  fontSize: 12,
                  color: "text.secondary",
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