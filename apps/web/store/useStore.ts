import { Parent } from "@repo/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  parent: Parent | null;
  token: string | null;
  setToken: (token: string) => void;
  setParent: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      parent: null,
      token: null,
      setToken: (token) => set({ token }),
      setParent: (parent) => set({ parent }),
      logout: () => {
        set({ parent: null, token: " " });
      },
    }),
    {
      name: "auth-storage", // key in localStorage
    },
  ),
);
