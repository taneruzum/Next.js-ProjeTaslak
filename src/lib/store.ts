import { configureStore } from "@reduxjs/toolkit";

import userSessionReducer from "./features/user/userSessionSlice";
import userAccSessionReducer from "./features/user/userAccountSlice";

export const GlobalStore = configureStore({
  reducer: {
    userSession: userSessionReducer,
    userAccountSession: userAccSessionReducer,
  },
});

export type RootState = ReturnType<typeof GlobalStore.getState>;
export type AppDispatch = typeof GlobalStore.dispatch;
