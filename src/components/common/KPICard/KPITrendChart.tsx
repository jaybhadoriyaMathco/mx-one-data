import ReactECharts from "echarts-for-react";
import { useTheme } from "@mui/material/styles";

import type { KPITrendDataPoint } from "./types";

interface KPITrendChartProps {
  data: KPITrendDataPoint[];
  color: string;
  fill?: boolean;
}

function KPITrendChart({
  data,
  color,
  fill = true,
}: KPITrendChartProps) {
  const theme = useTheme();

  const values = data.map((item) => item.value);

  const minimumValue = Math.min(...values);
  const maximumValue = Math.max(...values);

  const valueRange = maximumValue - minimumValue || 1;

  const verticalPadding = valueRange * 0.15;

  const option = {
    animation: false,

    grid: {
      top: 4,
      right: 0,
      bottom: 0,
      left: 0,
      containLabel: false,
    },

    xAxis: {
      type: "category",
      show: false,
      boundaryGap: false,
      data: values.map((_, index) => index),
    },

    yAxis: {
      type: "value",
      show: false,
      min: minimumValue - verticalPadding,
      max: maximumValue + verticalPadding,
    },

    series: [
      {
        type: "line",
        data: values,

        smooth: true,

        symbol: "none",

        lineStyle: {
          color,
          width: 2,
          cap: "round",
          join: "round",
        },

        areaStyle: fill
          ? {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: `${color}33`,
                  },
                  {
                    offset: 1,
                    color: `${color}05`,
                  },
                ],
              },
            }
          : undefined,
      },
    ],

    backgroundColor:
      theme.palette.mode === "dark"
        ? "transparent"
        : "transparent",
  };

  return (
    <ReactECharts
      option={option}
      style={{
        width: "100%",
        height: "100%",
      }}
      opts={{
        renderer: "svg",
      }}
      notMerge
      lazyUpdate
    />
  );
}

export default KPITrendChart;