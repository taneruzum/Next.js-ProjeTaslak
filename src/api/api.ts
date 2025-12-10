
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import API_ENDPOINTS from "./endpoints";

// Genel yapılandırma türü
interface RequestOptions<T = any> {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: T;
  headers?: Record<string, string>;
  timeout?: number;
  pathToken?: string; // For path parameters
  contentType?: string; // Manuel content-type belirleme
  responseType?: "json" | "text" | "blob" | "arraybuffer" | "stream"; // Response type
  params?: Record<string, any>; // URL query parameters
}

// Axios instance oluşturma (Merkezi yapı)
const apiClient: AxiosInstance = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  timeout: 12000,
  headers: {
    Accept: "application/json",
  },
});

// Content-Type belirleme yardımcı fonksiyonu
const determineContentType = (
  data: any,
  manualContentType?: string
): string => {
  if (manualContentType) {
    return manualContentType;
  }

  // FormData kontrolü
  if (data instanceof FormData) {
    // FormData için Content-Type header'ı otomatik olarak boundary ile birlikte ayarlanır
    return "multipart/form-data";
  }

  // URLSearchParams kontrolü
  if (data instanceof URLSearchParams) {
    return "application/x-www-form-urlencoded";
  }

  // File/Blob kontrolü
  if (data instanceof File || data instanceof Blob) {
    return data.type || "application/octet-stream";
  }

  // ArrayBuffer kontrolü
  if (data instanceof ArrayBuffer) {
    return "application/octet-stream";
  }

  // String kontrolü
  if (typeof data === "string") {
    // JSON string kontrolü
    try {
      JSON.parse(data);
      return "application/json";
    } catch {
      return "text/plain";
    }
  }

  // Object kontrolü (default JSON)
  if (typeof data === "object" && data !== null) {
    return "application/json";
  }

  return "application/json";
};

// Genel istek fonksiyonu
export const makeRequest = async <T = any>({
  url,
  method = "POST",
  data,
  headers = {},
  timeout,
  pathToken,
  contentType,
  responseType = "json",
  params,
}: RequestOptions): Promise<T & { _status: number }> => {
  try {
    // Prepare request headers
    const requestHeaders = { ...headers };

    // Content-Type belirleme (sadece veri gönderildiğinde)
    if (method !== "GET" && data !== undefined) {
      const determinedContentType = determineContentType(data, contentType);

      // FormData için Content-Type header'ını manuel olarak ayarlama
      // Axios otomatik olarak boundary ekler
      if (determinedContentType !== "multipart/form-data") {
        requestHeaders["Content-Type"] = determinedContentType;
      }

      console.log(`Content-Type set to: ${determinedContentType}`);
    }

    // Path token işleme
    let finalUrl = url;
    if (pathToken) {
      const encodedToken = encodeURIComponent(pathToken);
      finalUrl = `${url}/${encodedToken}`;
      console.log(`Added encoded token to URL path: ${url}/<encoded-token>`);
    }

    // Veri işleme
    let processedData = data;

    // FormData ve URLSearchParams için özel işlem yapma
    if (data instanceof FormData || data instanceof URLSearchParams) {
      processedData = data;
    } else if (
      typeof data === "object" &&
      data !== null &&
      !(data instanceof File) &&
      !(data instanceof Blob) &&
      !(data instanceof ArrayBuffer)
    ) {
      // Sadece düz objeler için JSON.stringify yap
      processedData = data;
    }

    const config: AxiosRequestConfig = {
      url: finalUrl,
      method,
      data: processedData,
      headers: requestHeaders,
      timeout,
      responseType,
      params,
    };

    // Request debugging
    console.log(`API Request to ${finalUrl}:`, {
      method,
      headers: Object.keys(requestHeaders),
      hasData: data !== undefined,
      hasPathToken: !!pathToken,
      hasParams: !!params,
      responseType,
    });

    // Veri türü debugging
    if (method !== "GET" && data !== undefined) {
      logRequestDataInfo(data);
    }

    const response: AxiosResponse<T> = await apiClient.request<T>(config);

    console.log(`API Response from ${finalUrl}:`, {
      status: response.status,
      statusText: response.statusText,
      hasData: !!response.data,
    });

    return {
      ...response.data,
      _status: response.status,
    };
  } catch (error:any) {
    // Hata debugging - sadece log için
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

    // Hatayı olduğu gibi fırlat - frontend'de yakalanacak
    throw error;
  }
};

// Request data logging yardımcı fonksiyonu
const logRequestDataInfo = (data: any): void => {
  try {
    if (data instanceof FormData) {
      console.log("Request body is FormData with entries:");
      // FormData.entries() yerine forEach kullanıyoruz
      data.forEach((value, key) => {
        const valueType =
          value instanceof File ? `File(${value.name})` : typeof value;
        console.log(`  ${key}: ${valueType}`);
      });
    } else if (data instanceof URLSearchParams) {
      console.log("Request body is URLSearchParams:", data.toString());
    } else if (data instanceof File) {
      console.log(`Request body is File: ${data.name} (${data.size} bytes)`);
    } else if (data instanceof Blob) {
      console.log(
        `Request body is Blob: ${data.size} bytes, type: ${data.type}`
      );
    } else if (data instanceof ArrayBuffer) {
      console.log(`Request body is ArrayBuffer: ${data.byteLength} bytes`);
    } else if (typeof data === "string") {
      console.log(`Request body is string: ${data.length} characters`);
      if (data.length > 0) {
        const preview = data.length > 50 ? `${data.substring(0, 50)}...` : data;
        console.log(`String preview: ${preview}`);
      }
    } else if (typeof data === "object" && data !== null) {
      console.log("Request body is object:", {
        keys: Object.keys(data),
        structurePreview: JSON.stringify(data).substring(0, 100) + "...",
      });
    } else {
      console.log(`Request body type: ${typeof data}`);
    }
  } catch (error) {
    console.error("Error logging request data info:", error);
  }
};