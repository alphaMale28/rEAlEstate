import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

import axiosInstance from "../lib/axios";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      userAuth: null,
      isCheckingAuth: true,
      isRegistering: false,
      isLoggingIn: false,
      isUpdatingProfile: false,

      checkAuth: async () => {
        try {
          const res = await axiosInstance.get("/auth/check");
          set({ userAuth: res.data });
        } catch (error) {
          console.log("Error in authCheck:", error);
          set({ userAuth: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      register: async (data) => {
        set({ isRegistering: true });

        try {
          const res = await axiosInstance.post("/auth/register", data);
          set({ userAuth: res.data });
          toast.success("Account created successfully!");

          return true;
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong.");
          return false;
        } finally {
          set({ isRegistering: false });
        }
      },

      login: async (data) => {
        set({ isLoggingIn: true });

        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ userAuth: res.data });

          toast.success("Logged in Successfully!");
          return true;
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong.");
          return false;
        } finally {
          set({ isLoggingIn: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ userAuth: null });

          toast.success("Logged out Successfully!");
        } catch (error) {
          toast.error("Error Logging out");
          console.log("Logout error:", error);
        }
      },

      updateProfile: async (data) => {
        set({ isUpdatingProfile: true });

        try {
          const { userAuth } = get();

          const res = await axiosInstance.put(`/users/${userAuth.id}`, data);
          set((state) => ({
            userAuth: { ...state.userAuth, ...res.data },
          }));

          toast.success("Profile update successfully!");
          return true;
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");

          return false;
        } finally {
          set({ isUpdatingProfile: false });
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
