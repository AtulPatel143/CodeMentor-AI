import axios, { AxiosError, type AxiosInstance } from "axios";
import toast from "react-hot-toast";

// Read API URL from Vite environment
const rawApiUrl = (import.meta.env.VITE_API_URL as string) || "";
const trimmedApiUrl = rawApiUrl.trim().replace(/\/+$|\s+$/g, "");
const apiUrl = trimmedApiUrl || `${window.location.origin}/api`;

if (!rawApiUrl) {
  console.warn(
    "⚠️ VITE_API_URL is not defined. Defaulting to the current origin with /api.",
  );
}

const normalizedApiUrl = apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;

const client: AxiosInstance = axios.create({
  baseURL: normalizedApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Debug
console.log("✅ API URL:", apiUrl);

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log(`${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);

  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("API Error:", error.response?.status, error.response?.data);

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
