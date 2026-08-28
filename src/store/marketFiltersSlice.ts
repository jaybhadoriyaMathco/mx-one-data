import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MarketFiltersState {
  tech: string;
  channel: string;
  subChannel: string;
  segment: string;
  serveSize: string;
  priceRange: string;
  nielsenArea: string;
  metric: string;
  period: string;
  year: string;
  compareYears: string[];
  comparePeriods: string[];
}

const initialState: MarketFiltersState = {
  tech: "all",
  channel: "traditional",
  subChannel: "all",
  segment: "ct",
  serveSize: "all",
  priceRange: "all",
  nielsenArea: "all",
  metric: "rsv",
  period: "p08",
  year: "2026",
  compareYears: [],
  comparePeriods: [],
};

const marketFiltersSlice = createSlice({
  name: "marketFilters",

  initialState,

  reducers: {
    setTech: (state, action: PayloadAction<string>) => {
      state.tech = action.payload;
    },

    setChannel: (state, action: PayloadAction<string>) => {
      state.channel = action.payload;

      // Reset sub-channel because its options
      // depend on the selected channel.
      state.subChannel = "all";
    },

    setSubChannel: (
      state,
      action: PayloadAction<string>
    ) => {
      state.subChannel = action.payload;
    },

    setSegment: (
      state,
      action: PayloadAction<string>
    ) => {
      state.segment = action.payload;
    },

    setServeSize: (
      state,
      action: PayloadAction<string>
    ) => {
      state.serveSize = action.payload;
    },

    setPriceRange: (
      state,
      action: PayloadAction<string>
    ) => {
      state.priceRange = action.payload;
    },

    setNielsenArea: (
      state,
      action: PayloadAction<string>
    ) => {
      state.nielsenArea = action.payload;
    },

    setMetric: (
      state,
      action: PayloadAction<string>
    ) => {
      state.metric = action.payload;
    },

    setPeriod: (
      state,
      action: PayloadAction<string>
    ) => {
      state.period = action.payload;
    },

    setYear: (
      state,
      action: PayloadAction<string>
    ) => {
      state.year = action.payload;
    },

    toggleCompareYear: (
      state,
      action: PayloadAction<string>
    ) => {
      const value = action.payload;

      if (state.compareYears.includes(value)) {
        state.compareYears =
          state.compareYears.filter(
            (item) => item !== value
          );
      } else {
        state.compareYears.push(value);
      }
    },

    toggleComparePeriod: (
      state,
      action: PayloadAction<string>
    ) => {
      const value = action.payload;

      if (state.comparePeriods.includes(value)) {
        state.comparePeriods =
          state.comparePeriods.filter(
            (item) => item !== value
          );
      } else {
        state.comparePeriods.push(value);
      }
    },

    removeCompareYear: (
      state,
      action: PayloadAction<string>
    ) => {
      state.compareYears =
        state.compareYears.filter(
          (item) => item !== action.payload
        );
    },

    removeComparePeriod: (
      state,
      action: PayloadAction<string>
    ) => {
      state.comparePeriods =
        state.comparePeriods.filter(
          (item) => item !== action.payload
        );
    },

    resetMarketFilters: () => {
      return initialState;
    },
  },
});

export const {
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
  resetMarketFilters,
} = marketFiltersSlice.actions;

export default marketFiltersSlice.reducer;