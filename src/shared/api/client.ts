import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../../features/auth/model/auth.store";
import { refreshAccess } from "./refreshAccess";
import { logApiError } from "./error-handler";

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const access = useAuthStore.getState().access;
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const original = error.config as RetryConfig | undefined;
    const url = original?.url ?? "";

    const isAuthEndpoint =
      url.includes("/auth/login/") || url.includes("/auth/refresh/");

    if (status === 401 && original && !original._retry && !isAuthEndpoint) {
      original._retry = true;
      try {
        const access = await refreshAccess();
        original.headers = {
          ...original.headers,
          Authorization: `Bearer ${access}`,
        };
        return apiClient(original);
      } catch {
        useAuthStore.getState().logout();
        if (window.location.pathname !== "/login") {
          window.location.replace("/login");
        }
        return Promise.reject(error);
      }
    }

    logApiError(status, error);
    return Promise.reject(error);
  },
);
