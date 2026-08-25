import { create } from "zustand";

export type TabId =
  | "overview"
  | "triage"
  | "search"
  | "batch"
  | "propagation"
  | "rca"
  | "audit";

interface UiStoreState {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export const useUiStore = create<UiStoreState>((set) => ({
  activeTab: "overview",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
