import { configureStore } from "@reduxjs/toolkit";

import marketFiltersReducer from "./marketFiltersSlice";

export const store = configureStore({
  reducer: {
    marketFilters: marketFiltersReducer,
  },
});

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch =
  typeof store.dispatch;