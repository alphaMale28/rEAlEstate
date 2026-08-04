import { create } from "zustand";

export const useListStore = create((set, get) => ({
  mainList: [],
  savedList: [],
  savePost: [],
  isLoading: false,
  isSaves: false,
}));
