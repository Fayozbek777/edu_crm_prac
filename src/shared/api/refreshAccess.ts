import axios from "axios";
import { useAuthStore } from "@/features/auth/model/auth.store";
import { endpoints } from "./endpoints";

const BASE = import.meta.env.VITE_API_URL;
let refreshPromise: Promise<string> | null = null;

export function refreshAccess(): Promise<string> {
  const refresh = useAuthStore.getState().refresh;
  if (!refresh) return Promise.reject(new Error("no refresh token"));

  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        `${BASE}${endpoints.auth.updateAccess}`,
        { refresh },
        { timeout: 10_000 },
      )
      .then((r) => {
        useAuthStore.getState().setAccess(r.data.access);
        return r.data.access as string;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}
