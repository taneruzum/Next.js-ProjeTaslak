import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie } from "typescript-cookie";

import { makeRequest } from "@/api/api";
import API_ENDPOINTS from "@/api/endpoints";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    UserId: string;
    AccessToken: string;
    AccessTokenExpiresAt: string;
  };
  message: string;
}

// Kullanıcı oturum açma işlemi için gerekli action
export const loginUser = createAsyncThunk(
  "userSession/login",
  async (credentials: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await makeRequest<LoginResponse>({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: "POST",
        data: credentials,
      });

      const { AccessToken, AccessTokenExpiresAt, UserId } = response.data;
      const expiresAt = new Date(AccessTokenExpiresAt);

      // Token'ları Cookie'ye yaz
      setCookie("user-access", AccessToken, {
        expires: expiresAt,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      setCookie("user-id", UserId, {
        expires: expiresAt,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return { userId: UserId };
    } catch (error: any) {
      return rejectWithValue(error?.message || "Login failed");
    }
  },
);
