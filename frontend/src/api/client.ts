import axios, { AxiosError, type AxiosInstance } from "axios";

import toast from "react-hot-toast";

// Normalize VITE_API_URL at build/runtime so callers don't need to hardcode `/api`.
const rawApiUrl = (import.meta.env.VITE_API_URL as string) || "";
const trimmed = rawApiUrl.replace(/\/+$/u, "");

const baseURL =
  trimmed === ""
    ? "/api"
    : trimmed.endsWith("/api")
      ? trimmed
      : `${trimmed}/api`;

const client: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ---------------- Response Interceptor ---------------- */

client.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.error("Session expired. Please login again.");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default client;
