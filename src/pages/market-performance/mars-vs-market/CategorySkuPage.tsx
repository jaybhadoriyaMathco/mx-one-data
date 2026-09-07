import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BarChart } from "../../../components/common/Charts/BarChart";
import { categoryOverviewXAxisData } from "../../../utils/constants";
import KPICard from "../../../components/common/KPICard/KPICard";

type Metric = "Value" | "Volume";
type Channel = "Combined" | "Modern" | "Traditional";

const BAR_COLORS = ["#1A237E", "#F57C00", "#26C6DA", "#00A651"];

const LEGEND_ITEMS = [
  { name: "MARS", color: "#1A237E" },
  { name: "Nestlé", color: "#C2185B" },
  { name: "Malta", color: "#26C6DA" },
  { name: "ADM", color: "#00A651" },
];

const CHART_DATA: Record<
  Metric,
  Record<Channel, { values: number[]; deltas: number[]; yMax: number; yInterval: number }>
> = {
  Value: {
    Combined: { values: [5800, 4500, 1800, 1100], deltas: [6.5, 5.8, 0.5, 4.0], yMax: 6000, yInterval: 1000 },
    Modern: { values: [5200, 4000, 1500, 900], deltas: [8.0, 5.2, -0.5, 2.8], yMax: 6000, yInterval: 1000 },
    Traditional: { values: [5350, 4250, 1650, 950], deltas: [7.2, 6.1, -1.1, 3.2], yMax: 6000, yInterval: 1000 },
  },
  Volume: {
    Combined: { values: [170, 155, 30, 18], deltas: [-0.5, 1.2, -2.0, 5.0], yMax: 180, yInterval: 20 },
    Modern: { values: [165, 148, 26, 15], deltas: [-1.8, 0.7, -3.4, 7.1], yMax: 180, yInterval: 20 },
    Traditional: { values: [150, 140, 22, 12], deltas: [-2.5, 0.3, -4.0, 6.0], yMax: 180, yInterval: 20 },
  },
};

function deltaLabel(delta: number) {
  const positive = delta >= 0;
  return {
    text: `${positive ? "▲" : "▼"} ${positive ? "+" : ""}${delta}%`,
    color: positive ? "#2E7D32" : "#D32F2F",
  };
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <Box
      role="group"
      sx={{
        display: "inline-flex",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "9px",
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      {options.map((option) => {
        const selected = option === value;

        return (
          <Box
            key={option}
            component="button"
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option)}
            sx={{
              appearance: "none",
              fontFamily: "inherit",
              border: 0,
              m: 0,
              px: 1.75,
              py: 0.7,
              fontSize: 12,
              fontWeight: 600,
              lineHeight: 1.2,
              cursor: "pointer",
              bgcolor: selected ? "#0000A0" : "transparent",
              color: selected ? "#fff" : "text.secondary",
              whiteSpace: "nowrap",
              "&:hover": {
                bgcolor: selected ? "#0000A0" : "action.hover",
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

const pageContainerSx = {
  width: "100%",
  height: "100%",
  minHeight: 0,
  overflow: "auto",
  bgcolor: (theme: any) =>
    theme.palette.mode === "dark" ? "background.default" : "#FFF7F7",
  color: "text.primary",
  borderRadius: 2,
  p: 2,
};

export function CategorySkuPage() {
  const theme = useTheme();
  const [metric, setMetric] = useState<Metric>("Volume");
  const [channel, setChannel] = useState<Channel>("Modern");

  const chart = CHART_DATA[metric][channel];

  const series = useMemo(
    () => [
      {
        name: "Manufacturers",
        data: chart.values,
        color: BAR_COLORS[0],
        colors: BAR_COLORS,
        barLabels: chart.deltas.map(deltaLabel),
      },
    ],
    [chart],
  );

  const isVolume = metric === "Volume";

  return (
    <Box sx={pageContainerSx}>
      <Box sx={{ mb: 2.25 }}>
        <Typography
          component="h1"
          sx={{ m: 0, fontSize: 22, fontWeight: 700, lineHeight: 1.3 }}
        >
          Category & SKU
        </Typography>
        <Typography sx={{ mt: 0.75, color: "text.secondary", fontSize: 12 }}>
          MARS performance compared with market · All categories · All channels · P08 2026
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: 1.75,
        }}
      >
        <KPICard
          label="MARS TOTAL VALUE YTD"
          value="$17M"
          accentColor={theme.palette.primary.main}
          comparison={{ status: "positive", value: "+4.4% ", text: "vs FY25" }}
        />
        <KPICard
          label="MARS VOLUME YTD (TONS)"
          value="80,380"
          accentColor={theme.palette.mode === "dark" ? "#40E8C8" : "#00A9C6"}
          comparison={{ status: "negative", value: "-2.9%", text: "vs FY25" }}
        />
        <KPICard
          label="MARKET VALUE GROWTH"
          value="+5.7%"
          accentColor={theme.palette.mode === "dark" ? "#E060C0" : "#BC2486"}
          comparison={{ status: "positive", value: "category expanding", text: "" }}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <BarChart
          title="Category Overview — All Manufacturers"
          subtitle={`${isVolume ? "Volume (Tons)" : "Volume (Tons)"} · ${channel} · Δ vs LY shown on bars`}
          headerActions={
            <>
              <SegmentedControl
                options={["Value", "Volume"] as const}
                value={metric}
                onChange={setMetric}
              />
              <SegmentedControl
                options={["Combined", "Modern", "Traditional"] as const}
                value={channel}
                onChange={setChannel}
              />
            </>
          }
          xAxisData={categoryOverviewXAxisData}
          xAxisName="Manufacturer"
          yAxisName={isVolume ? "Volume (Tons)" : "Voumne (Tons)"}
          series={series}
          legendItems={LEGEND_ITEMS}
          yAxis={{
            min: 0,
            max: chart.yMax,
            interval: chart.yInterval,
            formatter: (value: number) =>
              isVolume ? `${value}t` : `$${value.toLocaleString()}`,
          }}
          height={320}
          showLegend
        />
      </Box>
    </Box>
  );
}