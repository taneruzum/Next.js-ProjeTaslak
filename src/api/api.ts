import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import API_ENDPOINTS from "./endpoints";

// Genel yapılandırma türü
interface RequestOptions<T = any> {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: T;
  headers?: Record<string, string>;
  timeout?: number;
  pathToken?: string; // For path parameters
}

// Axios instance oluşturma
const apiClient: AxiosInstance = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  timeout: 12000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Hata yönetimi
const handleError = (error: any): never => {
  console.error("API Error Details:", {
    config: error.config,
    response: error.response
      ? {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        }
      : null,
    message: error.message,
  });

  const resData = error.response?.data;

  if (error.response) {
    switch (error.response.status) {
      case 400:
        if (resData?.errors) throw error;
        if (resData?.message) throw new Error(resData.message);
        if (resData?.title) throw new Error(resData.title);
        throw new Error("Bad Request: Please check your input data.");

      case 401:
        throw new Error("Unauthorized: Please login again.");

      case 403:
        throw new Error(resData?.message || "Forbidden: No permission.");

      case 405:
        throw new Error("Method Not Allowed: Unsupported operation.");

      default:
        throw new Error(
          resData?.message || `HTTP Error: ${error.response.status}`
        );
    }
  }

  if (error.request) {
    throw new Error(
      "Cannot reach server. Please check your internet connection."
    );
  }

  throw new Error(`Unknown error: ${error.message}`);
};

// Genel istek fonksiyonu
export const makeRequest = async <T = any>({
  url,
  method = "POST",
  data,
  headers = {},
  timeout,
  pathToken,
}: RequestOptions): Promise<T & { _status: number }> => {
  try {
    const requestHeaders = { ...headers };

    // Content-Type ayarı
    if (method !== "GET" && data) {
      requestHeaders["Content-Type"] =
        typeof data === "string" ? "text/plain" : "application/json";
    }

    // pathToken varsa URL'ye ekle
    let finalUrl = url;

    if (pathToken) {
      finalUrl = `${url}/${encodeURIComponent(pathToken)}`;
    }

    const config: AxiosRequestConfig = {
      url: finalUrl,
      method,
      data,
      headers: requestHeaders,
      timeout,
    };

    const response: AxiosResponse<T> = await apiClient.request<T>(config);

    return {
      ...response.data,
      _status: response.status,
    };
  } catch (error) {
    return Promise.reject(handleError(error));
  }
};
