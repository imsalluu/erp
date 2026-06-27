import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Role } from "../types";
import { MOCK_USERS } from "../mock-data";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (roles: Role[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email, password) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const user = MOCK_USERS[email];
        if (user && password === "123456") {
          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-storage");
        }
      },
      hasRole: (roles: Role[]) => {
        const { user } = get();
        if (!user) return false;
        return roles.includes(user.role);
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
