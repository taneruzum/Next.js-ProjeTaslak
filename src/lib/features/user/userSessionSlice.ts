import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import { loginUser } from "./actions/loginUser";
import { logoutUser } from "./actions/logoutUser";

import { UserSessionState } from "@/types/userSession";

const initialState: UserSessionState = {
  authControl: false,
  userId: "",
  loading: false,
  error: null,
};

const userSessionSlice = createSlice({
  name: "userSession",
  initialState,
  reducers: {
    logout() {
      return initialState;
    },
    //Geliştirici modunda "session sıfırla" butonu opsiyonel olarak duruyor
    setAuthControl(state, action: PayloadAction<boolean>) {
      state.authControl = action.payload;
    },
  },
  //API çağrıları için async işlemleri yöneten extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ userId: string }>) => {
          state.loading = false;
          state.authControl = true;
          state.userId = action.payload.userId;
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, () => {
        return initialState;
      });
  },
});

export const { logout, setAuthControl } = userSessionSlice.actions;
export default userSessionSlice.reducer;
