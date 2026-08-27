import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

interface AuthStore {
  //state
  user: User | null;
  token: string | null;
  hasApiKey: boolean;
  //status
  isLoading: boolean;
  //actions
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loadProfile: () => Promise<void>;
  setHasApiKey: (value: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      hasApiKey: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const data = await api.post<{ user: User; token: string }>(
            "/auth/login",
            { email, password },
          );
          set({ user: data.user, token: data.token, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        try {
          const data = await api.post<{ user: User; token: string }>(
            "/auth/register",
            { name, email, password },
          );
          set({ user: data.user, token: data.token, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, hasApiKey: false });
      },

      setHasApiKey: (value: boolean) => set({ hasApiKey: value }),

      loadProfile: async () => {
        const token = get().token;
        if (!token) return;
        try {
          const user = await api.get<User>("/auth/profile", token);
          set({ user });
        } catch {
          set({ user: null, token: null });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
);
