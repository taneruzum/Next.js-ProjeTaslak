import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeCookie } from "typescript-cookie";

import { resetUserAccount } from "../userAccountSlice";

import API_ENDPOINTS from "@/api/endpoints";
import { makeRequest } from "@/api/api";

interface LogoutResponse {
  message: string;
}

//Bu action, kullanıcıyı oturumdan çıkartmak için kullanılır.
export const logoutUser = createAsyncThunk(
  "userSession/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await makeRequest<LogoutResponse>({
        url: API_ENDPOINTS.AUTH.LOGOUT,
        method: "POST",
      });

      // Cookie'leri temizle
      removeCookie("user-access");
      removeCookie("user-id");

      dispatch(resetUserAccount());

      return true; // fulfilled'da kullanılabilir
    } catch (err: any) {
      return rejectWithValue(err?.message || "Logout failed");
    }
  },
);
