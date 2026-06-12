import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // important for cookie auth (Laravel Sanctum / JWT cookies)
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor (attach token if needed later)
axiosInstance.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor (basic error handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can expand later (toast, logout, etc.)
    if (error.response?.status === 401) {
      console.log("Unauthorized");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;