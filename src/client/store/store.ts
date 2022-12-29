import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account/accountSlice";
import roomReducer from "./room/roomSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    room: roomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
