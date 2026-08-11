import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const usePostStore = create((set, get) => ({
  userPost: [],
  isPostSaving: false,

  savePost: async (data) => {
    try {
      const res = await axiosInstance.post("/users/save", data);
      toast.success(res.data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  },

  addPost: async (postData, postDetail, userId) => {
    set({ isPostSaving: true });

    console.log("postData:", postData);
    console.log("postDetail:", postDetail);

    try {
      const res = await axiosInstance.post("/posts", {
        postData,
        postDetail,
        userId,
      });

      set({ userPost: res.data });
      toast.success("Post added successfully!");

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");

      return false;
    } finally {
      set({ isPostSaving: false });
    }
  },
}));
