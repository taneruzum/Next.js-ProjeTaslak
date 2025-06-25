import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserAccountState } from "@/types/userAccountSession";

import { createSlice } from "@reduxjs/toolkit";

import { fetchUserDetails } from "./actions/fetchUserDetails";

const initialState: UserAccountState = {
  name: "",
  email: "",
  gender: "",
  birthDate: "",
  nationality: "",
  profileImages: [],
  loading: false,
  error: null,
};

const userAccountSessionSlice = createSlice({
  name: "userAccountSession",
  initialState,
  reducers: {
    resetUserAccount() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserDetails.fulfilled,
        (
          state,
          action: PayloadAction<Omit<UserAccountState, "loading" | "error">>,
        ) => {
          return {
            ...state,
            ...action.payload,
            loading: false,
            error: null,
          };
        },
      )
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUserAccount } = userAccountSessionSlice.actions;
export default userAccountSessionSlice.reducer;
