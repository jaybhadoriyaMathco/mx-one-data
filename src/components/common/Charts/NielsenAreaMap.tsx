import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";
import {
  NIELSEN_AREAS,
  type NielsenArea,
  type NielsenMetric,
} from "../../../utils/constants";

const GEO_URL = "/geo/mexico-states.geo.json";
const MAP_NAME = "mexico-nielsen";

interface NielsenAreaMapProps {
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
  metric: NielsenMetric;
  selectedAreaId: string | null;
  onSelectArea: (areaId: string | null) => void;
  height?: number;
}

export function NielsenAreaMap({
  title = "Market Performance by Nielsen Area",
  subtitle = "Click an area to filter the whole page · toggle metric above",
  headerActions,
  metric,
  selectedAreaId,
  onSelectArea,
  height = 440,
}: NielsenAreaMapProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if ((echarts as any).getMap?.(MAP_NAME)) {
      setMapReady(true);
      return;
    }

    fetch(GEO_URL)
      .then((res) => res.json())
      .then((geoJson) => {
        if (cancelled) return;
        echarts.registerMap(MAP_NAME, geoJson);
        setMapReady(true);
      })
      .catch(() => {
        if (!cancelled) setMapReady(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const stateToArea = useMemo(() => {
    const map = new Map<string, NielsenArea>();
    NIELSEN_AREAS.forEach((area) =>
      area.states.forEach((state) => map.set(state, area)),
    );
    return map;
  }, []);

  const option: EChartsOption = useMemo(() => {
    const dimmed = isDark ? "#2A2F3A" : "#D8D4CC";
    const borderCol = isDark ? "#1A1F2B" : "#FFFFFF";

    const regions = Array.from(stateToArea.entries()).map(
      ([stateName, area]) => {
        const isSelected = selectedAreaId === area.id;
        const nothingSelected = selectedAreaId === null;

        return {
          name: stateName,
          itemStyle: {
            areaColor: isSelected || nothingSelected ? area.color : dimmed,
            opacity: isSelected || nothingSelected ? 1 : 0.5,
            borderColor: borderCol,
            borderWidth: 0.8,
          },
          emphasis: {
            itemStyle: { areaColor: area.color, opacity: 1 },
            label: { show: false },
          },
        };
      },
    );

    return {
      backgroundColor: isDark ? "transparent" : "#F7F4EF",

      tooltip: {
        trigger: "item",
        backgroundColor: isDark ? "#24242C" : "#FFFFFF",
        borderColor: isDark ? "#454550" : "#D9D9D9",
        borderWidth: 1,
        textStyle: { color: isDark ? "#F2F2F5" : "#222222", fontSize: 12 },
        formatter: (params: any) => {
          const area = stateToArea.get(params.name);
          if (!area) return params.name;
          return `
            <div style="font-size:12px;">
              <div style="font-weight:700;margin-bottom:4px;">${area.name}</div>
              <div>${params.name}</div>
              <div style="margin-top:4px;">SOM: <b>${area.som}</b></div>
              <div>Growth: <b>${area.growth}</b></div>
              <div>RSV: <b>${area.rsv}</b></div>
            </div>
          `;
        },
      },

      geo: {
        map: MAP_NAME,
        roam: false,
        selectedMode: false,
        layoutCenter: ["50%", "52%"],
        layoutSize: "108%",
        itemStyle: { areaColor: dimmed, borderColor: borderCol },
        regions,
      },

      series: [
        {
          type: "scatter",
          coordinateSystem: "geo",
          symbolSize: 1,
          silent: true,
          data: NIELSEN_AREAS.map((area) => ({
            name: area.shortLabel,
            value: area.labelCoord,
            areaId: area.id,
          })),
          label: {
            show: true,
            position: "inside",
            formatter: (params: any) => {
              const area = NIELSEN_AREAS.find(
                (a) => a.id === params.data.areaId,
              );
              return `{t|${area?.shortLabel}}\n{v|${area?.growth}}`;
            },
            rich: {
              t: {
                fontSize: 11,
                fontWeight: 700,
                color: isDark ? "#F2F2F5" : "#1A1A1A",
                lineHeight: 14,
                textBorderColor: isDark ? "#12151C" : "#FFFFFF",
                textBorderWidth: 3,
              },
              v: {
                fontSize: 11,
                fontWeight: 700,
                color: isDark ? "#F2F2F5" : "#1A1A1A",
                lineHeight: 14,
                textBorderColor: isDark ? "#12151C" : "#FFFFFF",
                textBorderWidth: 3,
              },
            },
          },
        },
      ],

      animationDuration: 300,
    };
  }, [isDark, selectedAreaId, stateToArea, metric]);

  const onEvents = useMemo(
    () => ({
      click: (params: any) => {
        const area = stateToArea.get(params.name);
        if (!area) return;
        onSelectArea(selectedAreaId === area.id ? null : area.id);
      },
    }),
    [stateToArea, onSelectArea, selectedAreaId],
  );

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        overflow: "hidden",
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
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700, lineHeight: 1.3 }}>
            {title}
          </Typography>
          <Typography sx={{ mt: 0.4, fontSize: 12, color: "text.secondary" }}>
            {subtitle}
          </Typography>
        </Box>

        {headerActions && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
              flexShrink: 0,
            }}
          >
            {headerActions}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1fr) minmax(0, 1fr)",
          },
          gap: 2,
          alignItems: "stretch",
          "& > *": { minWidth: 0 },
        }}
      >
        <Box
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: isDark ? "transparent" : "#F7F4EF",
            minHeight: height,
          }}
        >
          {mapReady ? (
            <ReactECharts
              option={option}
              style={{ width: "100%", height }}
              onEvents={onEvents}
              notMerge
              lazyUpdate
            />
          ) : (
            <Box
              sx={{
                height,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
                fontSize: 12,
              }}
            >
              Loading map…
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, minmax(0, 1fr))",
            },
            gap: 1.5,
            "& > *": { minWidth: 0 },
          }}
        >
          {NIELSEN_AREAS.map((area) => {
            const isSelected = selectedAreaId === area.id;

            return (
              <Box
                key={area.id}
                component="button"
                type="button"
                onClick={() => onSelectArea(isSelected ? null : area.id)}
                sx={{
                  appearance: "none",
                  fontFamily: "inherit",
                  textAlign: "left",
                  cursor: "pointer",
                  p: 1.5,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: isSelected ? "primary.main" : "divider",
                  borderWidth: isSelected ? 2 : 1,
                  bgcolor: isSelected
                    ? isDark
                      ? "rgba(96,96,255,0.14)"
                      : "#EAF4FE"
                    : isDark
                      ? "rgba(255,255,255,0.03)"
                      : "#F7F7F7",
                  transition: "background .15s ease, border-color .15s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "text.primary",
                  }}
                >
                  {area.name}
                </Typography>

                <Typography
                  sx={{ mt: 0.4, fontSize: 11.5, color: "text.secondary" }}
                >
                  Pop share: {area.popShare}
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    fontSize: 21,
                    fontWeight: 700,
                    lineHeight: 1.1,
                    color: area.color,
                  }}
                >
                  {metric === "RSV Mix" ? area.rsvMix : area.som}
                </Typography>

                <Typography
                  sx={{ mt: 0.75, fontSize: 11.5, color: "text.secondary" }}
                >
                  RSV: {area.rsv}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}