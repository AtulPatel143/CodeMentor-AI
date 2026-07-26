import axios, { AxiosError, type AxiosInstance } from "axios";
import toast from "react-hot-toast";

// Read API URL from Vite environment
const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  console.error(
    "❌ VITE_API_URL is not defined. Check your frontend .env file.",
  );
}

const client: AxiosInstance = axios.create({
  baseURL: apiUrl,
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
