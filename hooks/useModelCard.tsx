import { create } from "zustand";

type CardModalStore = {
  id?: string | undefined;
  isOpen: boolean;
  onOpen: (id: string | undefined) => void;
  onClose: () => void;
};

export const useModelCard = create<CardModalStore>((set) => ({
  id: "",
  isOpen: false,
  onOpen: (id: string | undefined) => set({ isOpen: true, id }),

  onClose: () => set({ isOpen: false, id: undefined }),
}));
