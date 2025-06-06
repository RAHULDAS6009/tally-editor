import { configureStore } from "@reduxjs/toolkit";
import blockReducer from "./slices/BlockSlice";

export const store = configureStore({
  reducer: {
    blocks: blockReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
