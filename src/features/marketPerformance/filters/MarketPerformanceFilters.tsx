import {
  Checkbox,
  ListSubheader,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../../../store";

import {
  setTech,
  setChannel,
  setSubChannel,
  setSegment,
  setServeSize,
  setPriceRange,
  setNielsenArea,
  setMetric,
  setPeriod,
  setYear,
  toggleCompareYear,
  toggleComparePeriod,
  removeCompareYear,
  removeComparePeriod,
} from "../../../store/marketFiltersSlice";

import "./MarketPerformanceFilters.css";

type Option = {
  label: string;
  value: string;
};

type SegmentFilterProps = {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

function SegmentFilter({ value, options, onChange }: SegmentFilterProps) {
  return (
    <div className="market-filter-segment">
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          className={`market-filter-segment__item ${
            value === option.value ? "is-active" : ""
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function MarketPerformanceFilters() {
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

  const menuProps = {
    PaperProps: {
      className: "market-filter-dropdown",
    },
  };

  const compareMenuProps = {
    PaperProps: {
      className: "market-filter-dropdown market-filter-dropdown--compare",
    },
    anchorOrigin: {
      vertical: "bottom" as const,
      horizontal: "left" as const,
    },
    transformOrigin: {
      vertical: "top" as const,
      horizontal: "left" as const,
    },
  };

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

  const subChannelOptions = getSubChannelOptions();

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
      if (!nextYears.includes(item)) {
        dispatch(toggleCompareYear(item));
      }
    });

    nextYears.forEach((item) => {
      if (!compareYears.includes(item)) {
        dispatch(toggleCompareYear(item));
      }
    });

    comparePeriods.forEach((item) => {
      if (!nextPeriods.includes(item)) {
        dispatch(toggleComparePeriod(item));
      }
    });

    nextPeriods.forEach((item) => {
      if (!comparePeriods.includes(item)) {
        dispatch(toggleComparePeriod(item));
      }
    });
  };

  return (
    <div
      className={`market-filters ${
        hasCompareSelection ? "has-compare-selection" : ""
      }`}
    >
      <div className="market-filters__body">
        <div className="market-filters__label">FILTERS</div>

        <div className="market-filter-group">
          <span className="market-filter-group__label">Tech</span>
          <SegmentFilter
            value={tech}
            options={techOptions}
            onChange={(value) => dispatch(setTech(value))}
          />
        </div>

        <div className="market-filter-group">
          <span className="market-filter-group__label">Channel</span>
          <SegmentFilter
            value={channel}
            options={channelOptions}
            onChange={(value) => dispatch(setChannel(value))}
          />
        </div>

        {channel !== "all" && (
          <div className="market-filter-group">
            <span className="market-filter-group__label">Sub-channel</span>
            <SegmentFilter
              value={subChannel}
              options={subChannelOptions}
              onChange={(value) => dispatch(setSubChannel(value))}
            />
          </div>
        )}

        <div className="market-filter-group">
          <span className="market-filter-group__label">Segment</span>
          <SegmentFilter
            value={segment}
            options={segmentOptions}
            onChange={(value) => dispatch(setSegment(value))}
          />
        </div>

        <div className="market-filter-group">
          <span className="market-filter-group__label">Serve Size</span>
          <Select
            className="market-filter-select market-filter-select--serve"
            value={serveSize}
            size="small"
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
        </div>

        <div className="market-filter-group">
          <span className="market-filter-group__label">Price Range</span>
          <Select
            className="market-filter-select market-filter-select--price"
            value={priceRange}
            size="small"
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
        </div>

        <div className="market-filter-group">
          <span className="market-filter-group__label">Nielsen Area</span>
          <Select
            className="market-filter-select market-filter-select--nielsen"
            value={nielsenArea}
            size="small"
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
        </div>

        <div className="market-filter-group">
          <span className="market-filter-group__label">Metric</span>
          <SegmentFilter
            value={metric}
            options={metricOptions}
            onChange={(value) => dispatch(setMetric(value))}
          />
        </div>

        <div className="market-filter-group">
          <span className="market-filter-group__label">Period</span>
          <Select
            className="market-filter-select market-filter-select--period"
            value={period}
            size="small"
            MenuProps={menuProps}
            onChange={(event: SelectChangeEvent<string>) =>
              dispatch(setPeriod(event.target.value))
            }
          >
            <MenuItem value="p01">P01</MenuItem>
            <MenuItem value="p02">P02</MenuItem>
            <MenuItem value="p03">P03</MenuItem>
            <MenuItem value="p04">P04</MenuItem>
            <MenuItem value="p05">P05</MenuItem>
            <MenuItem value="p06">P06</MenuItem>
            <MenuItem value="p07">P07</MenuItem>
            <MenuItem value="p08">P08</MenuItem>
            <MenuItem value="p09">P09</MenuItem>
            <MenuItem value="p10">P10</MenuItem>
            <MenuItem value="p11">P11</MenuItem>
            <MenuItem value="p12">P12</MenuItem>
            <MenuItem value="p13">P13</MenuItem>
          </Select>

          <Select
            className="market-filter-select market-filter-select--year"
            value={year}
            size="small"
            MenuProps={menuProps}
            onChange={(event: SelectChangeEvent<string>) =>
              dispatch(setYear(event.target.value))
            }
          >
            <MenuItem value="2025">2025</MenuItem>
            <MenuItem value="2026">2026</MenuItem>
          </Select>
        </div>

        <div className="market-filter-group market-filter-group--compare">
          <span className="market-filter-group__label">Compare with</span>

          <div className="market-filter-compare-control">
            <Select
              multiple
              displayEmpty
              className="market-filter-select market-filter-select--compare"
              value={compareValues}
              size="small"
              MenuProps={compareMenuProps}
              onChange={handleCompareChange}
              renderValue={() => "+ Add period"}
            >
              <ListSubheader className="market-filter-dropdown__header">
                YEAR
              </ListSubheader>

              <MenuItem value="year:2024">
                <Checkbox
                  size="small"
                  checked={compareYears.includes("2024")}
                />
                2024
              </MenuItem>

              <MenuItem value="year:2025">
                <Checkbox
                  size="small"
                  checked={compareYears.includes("2025")}
                />
                2025
              </MenuItem>

              <ListSubheader className="market-filter-dropdown__header">
                PERIOD
              </ListSubheader>

              <MenuItem value="period:YTD">
                <Checkbox
                  size="small"
                  checked={comparePeriods.includes("YTD")}
                />
                YTD
              </MenuItem>

              <MenuItem value="period:P04">
                <Checkbox
                  size="small"
                  checked={comparePeriods.includes("P04")}
                />
                P04
              </MenuItem>

              <MenuItem value="period:P06">
                <Checkbox
                  size="small"
                  checked={comparePeriods.includes("P06")}
                />
                P06
              </MenuItem>
            </Select>

            {hasCompareSelection && (
              <div className="compare-period-chips">
                {compareYears.map((value) => (
                  <button
                    type="button"
                    key={`year-${value}`}
                    className="compare-period-chip"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => dispatch(removeCompareYear(value))}
                  >
                    <span>{value}</span>
                    <span className="compare-period-chip__close">×</span>
                  </button>
                ))}

                {comparePeriods.map((value) => (
                  <button
                    type="button"
                    key={`period-${value}`}
                    className="compare-period-chip"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => dispatch(removeComparePeriod(value))}
                  >
                    <span>{value}</span>
                    <span className="compare-period-chip__close">×</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketPerformanceFilters;