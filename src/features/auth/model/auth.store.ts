import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/auth.types";

interface AuthState {
  access: string | null;
  refresh: string | null;
  user: User | null;

  setAuth: (access: string, refresh: string, user: User) => void;
  setAccess: (access: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      access: null,
      refresh: null,
      user: null,

      setAuth: (access, refresh, user) => set({ access, refresh, user }),
      setAccess: (access) => set({ access }),
      setUser: (user) => set({ user }),
      logout: () => set({ access: null, refresh: null, user: null }),
    }),
    { name: "edu-crm-auth" },
  ),
);
