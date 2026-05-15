import { create } from "zustand";

interface User {
  _id: string;

  name: string;

  email: string;

  avatar?: string;
}

interface AuthStore {
  user: User | null;

  token: string | null;

  setAuth: (
    user: User,
    token: string,
  ) => void;

  loadUser: () => void;

  logout: () => void;
}

export const useAuthStore =
  create<AuthStore>((set) => ({
    user: null,

    token: null,

    setAuth: (
      user,
      token,
    ) => {
      localStorage.setItem(
        "token",
        token,
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user),
      );

      set({
        user,
        token,
      });
    },

    loadUser: () => {
      const token =
        localStorage.getItem(
          "token",
        );

      const user =
        localStorage.getItem(
          "user",
        );

      if (token && user) {
        set({
          token,
          user: JSON.parse(user),
        });
      }
    },

    logout: () => {
      localStorage.removeItem(
        "token",
      );

      localStorage.removeItem(
        "user",
      );

      set({
        user: null,
        token: null,
      });
    },
  }));