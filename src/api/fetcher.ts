"use client"
import axios from "axios";
import API_ENDPOINTS from "./endpoints";
import camelCaseKeys from "@/utils/convertCamelCase";
import { keysToPascalCase } from "@/lib/utils";
import { mutate } from "swr";
import { Logger } from "@/utils/logger";

const isProd = process.env.NODE_ENV === "production";

const fetcher = axios.create({
    baseURL: API_ENDPOINTS.BASE_URL,
    withCredentials: true, // Always send cookies (HttpOnly cookies will be handled by browser)
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// REQUEST INTERCEPTOR
// No longer need to manually attach token from cookie since it's HttpOnly
fetcher.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        if (config.headers) {
            delete config.headers["Content-Type"];
        }
    } else if (config.data) {
        config.data = keysToPascalCase(config.data);
    }
    return config;
});

// RESPONSE INTERCEPTOR
fetcher.interceptors.response.use(
    (response) => camelCaseKeys(response.data),
    (error) => {
        if (error.response?.status === 401) {
            mutate(() => true, undefined, { revalidate: false });

            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }
        Logger.log("AXIOS INTERCEPTOR ERROR:", error.response);
        return Promise.reject(error);
    }
);

export default fetcher;
