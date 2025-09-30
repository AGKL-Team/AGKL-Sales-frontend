import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SignInResponse } from "../interfaces/responses/sign-in-response.interface";

type Store = {
  authResponse?: SignInResponse;
  isAuthenticated: boolean;
  setAuthResponse: (authResponse: SignInResponse) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
  login: (authResponse: SignInResponse) => void;
};

export const useAuthStore = create<Store>()(
  persist(
    (set) => ({
      authResponse: undefined,
      isAuthenticated: false,
      setAuthResponse: (authResponse: SignInResponse) => {
        set({ authResponse });
      },
      setIsAuthenticated: (isAuthenticated: boolean) => {
        set({ isAuthenticated });
      },
      logout: () => {
        set({ authResponse: undefined, isAuthenticated: false });
      },
      login: (authResponse: SignInResponse) => {
        set({ isAuthenticated: true, authResponse });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
