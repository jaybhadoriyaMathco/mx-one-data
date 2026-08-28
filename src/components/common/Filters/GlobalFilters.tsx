import {
  Box,
  Checkbox,
  Chip,
  ListSubheader,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  type SelectChangeEvent,
  type SxProps,
  type Theme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../../store";
import {
  removeComparePeriod,
  removeCompareYear,
  setChannel,
  setMetric,
  setNielsenArea,
  setPeriod,
  setPriceRange,
  setSegment,
  setServeSize,
  setSubChannel,
  setTech,
  setYear,
  toggleComparePeriod,
  toggleCompareYear,
} from "../../../store/marketFiltersSlice";

type Option = {
  label: string;
  value: string;
};

const selectSx: SxProps<Theme> = {
  height: 30,
  bgcolor: "background.paper",
  fontSize: 12,
  "& .MuiSelect-select": {
    py: 0,
    height: 30,
    display: "flex",
    alignItems: "center",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "divider",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "text.secondary",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "primary.main",
  },
};

const menuPaperSx: SxProps<Theme> = {
  bgcolor: "background.paper",
  color: "text.primary",
  border: "1px solid",
  borderColor: "divider",
  mt: 0.5,
  "& .MuiMenuItem-root": {
    fontSize: 12,
    minHeight: 32,
    "&:hover": {
      bgcolor: "primary.main",
      color: "primary.contrastText",
    },
    "&.Mui-selected": {
      bgcolor: "transparent",
    },
    "&.Mui-selected:hover": {
      bgcolor: "primary.main",
      color: "primary.contrastText",
    },
  },
};

const menuProps = {
  PaperProps: {
    sx: menuPaperSx,
  },
};

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        gap: 0.75,
        pl: 1.25,
        "&::before": {
          content: '""',
          width: "1px",
          height: 30,
          bgcolor: "divider",
          mr: 0.5,
          flex: "0 0 auto",
        },
      }}
    >
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: 12,
          fontWeight: 600,
          lineHeight: "30px",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
}

function SegmentFilter({
  value,
  options,
  onChange,
}: {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}) {
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={value}
      onChange={(_, next) => {
        if (next) onChange(next);
      }}
    sx={(theme) => ({
    height: 30,
    bgcolor: "background.paper",
    "& .MuiToggleButtonGroup-grouped": {
        height: 30,
        px: 1.5,
        borderColor: "divider",
        color: "text.secondary",
        fontSize: 12,
        fontWeight: 400,
        textTransform: "none",
        "&:hover": {
        bgcolor: alpha(theme.palette.primary.main, 0.12),
        color: "primary.main",
        },
        "&.Mui-selected": {
        bgcolor: "primary.main",
        color: theme.palette.getContrastText(theme.palette.primary.main),
        fontWeight: 600,
        },
        "&.Mui-selected:hover": {
        bgcolor: "primary.main",
        color: theme.palette.getContrastText(theme.palette.primary.main),
        },
    },
    })}
    >
      {options.map((option) => (
        <ToggleButton key={option.value} value={option.value}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

function GlobalFilters() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    tech,
    channel,
    subChannel,
    segment,
    serveSize,
    priceRange,
    nielsenArea,
    metric,
    period,
    year,
    compareYears,
    comparePeriods,
  } = useSelector((state: RootState) => state.marketFilters);

  const hasCompareSelection =
    compareYears.length > 0 || comparePeriods.length > 0;

  const compareValues = [
    ...compareYears.map((value) => `year:${value}`),
    ...comparePeriods.map((value) => `period:${value}`),
  ];

  const techOptions: Option[] = [
    { label: "All", value: "all" },
    { label: "Cats", value: "cats" },
    { label: "Dogs", value: "dogs" },
  ];

  const channelOptions: Option[] = [
    { label: "All", value: "all" },
    { label: "Modern", value: "modern" },
    { label: "Traditional", value: "traditional" },
  ];

  const segmentOptions: Option[] = [
    { label: "All", value: "all" },
    { label: "Dry", value: "dry" },
    { label: "Wet", value: "wet" },
    { label: "C&T", value: "ct" },
  ];

  const metricOptions: Option[] = [
    { label: "RSV", value: "rsv" },
    { label: "Volume", value: "volume" },
  ];

  const getSubChannelOptions = (): Option[] => {
    switch (channel) {
      case "modern":
        return [
          { label: "All", value: "all" },
          { label: "SS", value: "ss" },
          { label: "Proximity", value: "proximity" },
        ];
      case "traditional":
        return [
          { label: "All", value: "all" },
          { label: "WHS", value: "whs" },
          { label: "C&C", value: "c&c" },
          { label: "Other SS", value: "other-ss" },
        ];
      default:
        return [];
    }
  };

  const handleCompareChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    const selectedValues = typeof value === "string" ? value.split(",") : value;

    const nextYears = selectedValues
      .filter((item) => item.startsWith("year:"))
      .map((item) => item.replace("year:", ""));

    const nextPeriods = selectedValues
      .filter((item) => item.startsWith("period:"))
      .map((item) => item.replace("period:", ""));

    compareYears.forEach((item) => {
      if (!nextYears.includes(item)) dispatch(toggleCompareYear(item));
    });
    nextYears.forEach((item) => {
      if (!compareYears.includes(item)) dispatch(toggleCompareYear(item));
    });
    comparePeriods.forEach((item) => {
      if (!nextPeriods.includes(item)) dispatch(toggleComparePeriod(item));
    });
    nextPeriods.forEach((item) => {
      if (!comparePeriods.includes(item)) dispatch(toggleComparePeriod(item));
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexWrap: "wrap",
          columnGap: 1.25,
          rowGap: 1,
          px: 2.75,
          pt: 1.25,
          pb: hasCompareSelection ? 5.25 : 1.25,
        }}
      >
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.3px",
            lineHeight: "30px",
            whiteSpace: "nowrap",
          }}
        >
          FILTERS
        </Typography>

        <FilterGroup label="Tech">
          <SegmentFilter
            value={tech}
            options={techOptions}
            onChange={(value) => dispatch(setTech(value))}
          />
        </FilterGroup>

        <FilterGroup label="Channel">
          <SegmentFilter
            value={channel}
            options={channelOptions}
            onChange={(value) => dispatch(setChannel(value))}
          />
        </FilterGroup>

        {channel !== "all" && (
          <FilterGroup label="Sub-channel">
            <SegmentFilter
              value={subChannel}
              options={getSubChannelOptions()}
              onChange={(value) => dispatch(setSubChannel(value))}
            />
          </FilterGroup>
        )}

        <FilterGroup label="Segment">
          <SegmentFilter
            value={segment}
            options={segmentOptions}
            onChange={(value) => dispatch(setSegment(value))}
          />
        </FilterGroup>

        <FilterGroup label="Serve Size">
          <Select
            value={serveSize}
            size="small"
            sx={{ ...selectSx, width: 126 }}
            MenuProps={menuProps}
            onChange={(event: SelectChangeEvent<string>) =>
              dispatch(setServeSize(event.target.value))
            }
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="less-500g">&lt;500g</MenuItem>
            <MenuItem value="500g-1.5kg">500g–1.5kg</MenuItem>
            <MenuItem value="1.5-4kg">1.5–4kg</MenuItem>
            <MenuItem value="greater-4kg">&gt;4kg</MenuItem>
          </Select>
        </FilterGroup>

        <FilterGroup label="Price Range">
          <Select
            value={priceRange}
            size="small"
            sx={{ ...selectSx, width: 145 }}
            MenuProps={menuProps}
            onChange={(event: SelectChangeEvent<string>) =>
              dispatch(setPriceRange(event.target.value))
            }
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="value">Value</MenuItem>
            <MenuItem value="mainstream">Mainstream</MenuItem>
            <MenuItem value="premium">Premium</MenuItem>
            <MenuItem value="superpremium">Superpremium</MenuItem>
          </Select>
        </FilterGroup>

        <FilterGroup label="Nielsen Area">
          <Select
            value={nielsenArea}
            size="small"
            sx={{ ...selectSx, width: 178 }}
            MenuProps={menuProps}
            onChange={(event: SelectChangeEvent<string>) =>
              dispatch(setNielsenArea(event.target.value))
            }
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="north">North</MenuItem>
            <MenuItem value="central">Central</MenuItem>
            <MenuItem value="south">South</MenuItem>
          </Select>
        </FilterGroup>

        <FilterGroup label="Metric">
          <SegmentFilter
            value={metric}
            options={metricOptions}
            onChange={(value) => dispatch(setMetric(value))}
          />
        </FilterGroup>

        <FilterGroup label="Period">
          <Select
            value={period}
            size="small"
            sx={{ ...selectSx, width: 126 }}
            MenuProps={menuProps}
            onChange={(event: SelectChangeEvent<string>) =>
              dispatch(setPeriod(event.target.value))
            }
          >
            {[
              "p01",
              "p02",
              "p03",
              "p04",
              "p05",
              "p06",
              "p07",
              "p08",
              "p09",
              "p10",
              "p11",
              "p12",
              "p13",
            ].map((item) => (
              <MenuItem key={item} value={item}>
                {item.toUpperCase()}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={year}
            size="small"
            sx={{ ...selectSx, width: 126 }}
            MenuProps={menuProps}
            onChange={(event: SelectChangeEvent<string>) =>
              dispatch(setYear(event.target.value))
            }
          >
            <MenuItem value="2025">2025</MenuItem>
            <MenuItem value="2026">2026</MenuItem>
          </Select>
        </FilterGroup>

        <FilterGroup label="Compare with">
          <Box sx={{ position: "relative", width: 136, height: 30 }}>
            <Select
              multiple
              displayEmpty
              value={compareValues}
              size="small"
              sx={{ ...selectSx, width: 136 }}
              MenuProps={{
                ...menuProps,
                PaperProps: {
                  sx: { ...menuPaperSx, width: 250 },
                },
                anchorOrigin: { vertical: "bottom", horizontal: "left" },
                transformOrigin: { vertical: "top", horizontal: "left" },
              }}
              onChange={handleCompareChange}
              renderValue={() => "+ Add period"}
            >
              <ListSubheader
                sx={{
                  bgcolor: "background.paper",
                  color: "text.secondary",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  lineHeight: "28px",
                }}
              >
                YEAR
              </ListSubheader>
              <MenuItem value="year:2024">
                <Checkbox size="small" checked={compareYears.includes("2024")} />
                2024
              </MenuItem>
              <MenuItem value="year:2025">
                <Checkbox size="small" checked={compareYears.includes("2025")} />
                2025
              </MenuItem>
              <ListSubheader
                sx={{
                  bgcolor: "background.paper",
                  color: "text.secondary",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  lineHeight: "28px",
                }}
              >
                PERIOD
              </ListSubheader>
              <MenuItem value="period:YTD">
                <Checkbox size="small" checked={comparePeriods.includes("YTD")} />
                YTD
              </MenuItem>
              <MenuItem value="period:P04">
                <Checkbox size="small" checked={comparePeriods.includes("P04")} />
                P04
              </MenuItem>
              <MenuItem value="period:P06">
                <Checkbox size="small" checked={comparePeriods.includes("P06")} />
                P06
              </MenuItem>
            </Select>

            {hasCompareSelection && (
              <Box
                sx={{
                  position: "absolute",
                  top: 36,
                  left: 0,
                  display: "flex",
                  gap: 0.75,
                  whiteSpace: "nowrap",
                }}
              >
                {compareYears.map((value) => (
                  <Chip
                    key={`year-${value}`}
                    size="small"
                    label={value}
                    onDelete={() => dispatch(removeCompareYear(value))}
                    onMouseDown={(event) => event.preventDefault()}
                    sx={(theme) => ({
                    height: 26,
                    bgcolor:
                        theme.palette.mode === "dark"
                        ? "#FFFFFF"
                        : alpha(theme.palette.primary.main, 0.08),
                    color: "primary.main",
                    border: "1px solid",
                    borderColor:
                        theme.palette.mode === "dark"
                        ? "#FFFFFF"
                        : alpha(theme.palette.primary.main, 0.35),
                    "& .MuiChip-deleteIcon": {
                        color: "primary.main",
                        fontSize: 16,
                        margin: "0 2px 0 -2px",
                        bgcolor: "transparent",
                        borderRadius: 0,
                        "&:hover": {
                        color: "primary.main",
                        bgcolor: "transparent",
                        },
                    },
                    })}
                  />
                ))}
                {comparePeriods.map((value) => (
                  <Chip
                    key={`period-${value}`}
                    size="small"
                    label={value}
                    onDelete={() => dispatch(removeComparePeriod(value))}
                    onMouseDown={(event) => event.preventDefault()}
                    sx={(theme) => ({
                    height: 26,
                    bgcolor:
                        theme.palette.mode === "dark"
                        ? "#FFFFFF"
                        : alpha(theme.palette.primary.main, 0.08),
                    color: "primary.main",
                    border: "1px solid",
                    borderColor:
                        theme.palette.mode === "dark"
                        ? "#FFFFFF"
                        : alpha(theme.palette.primary.main, 0.35),
                    "& .MuiChip-deleteIcon": {
                        color: "primary.main",
                        fontSize: 16,
                        margin: "0 2px 0 -2px",
                        bgcolor: "transparent",
                        borderRadius: 0,
                        "&:hover": {
                        color: "primary.main",
                        bgcolor: "transparent",
                        },
                    },
                    })}
                  />
                ))}
              </Box>
            )}
          </Box>
        </FilterGroup>
      </Box>
    </Box>
  );
}

export default GlobalFilters;