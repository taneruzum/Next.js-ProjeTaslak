import { createAsyncThunk } from "@reduxjs/toolkit";

import { makeRequest } from "@/api/api";
import API_ENDPOINTS from "@/api/endpoints";

interface UserDetailsResponse {
  name: string;
  email: string;
  gender: string;
  birthDate: string;
  nationality: string;
  profileImages: string[];
}

export const fetchUserDetails = createAsyncThunk(
  "userAccountSession/fetchUserDetails",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await makeRequest<UserDetailsResponse>({
        url: `${API_ENDPOINTS.USER.GET_USER}/${userId}`,
        method: "GET",
      });

      return response;
    } catch (err: any) {
      return rejectWithValue(err?.message || "User details fetch failed");
    }
  },
);
