import { configureStore } from "@reduxjs/toolkit";

// slices
import counterReducer from "./slices/counterSlice";
import eventsReducer from "./slices/eventsSlice";
import checkoutReducer from "./slices/checkoutSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    events: eventsReducer,
    checkout: checkoutReducer,
  },
});

// Types
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
