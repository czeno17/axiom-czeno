// src/stores/activeTabStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ActiveTabState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useActiveTabStore = create<ActiveTabState>()(
  persist(
    (set) => ({
      activeTab: "overview",
      setActiveTab: (tab) => {
        console.log("Setting active tab to:", tab); // Debug log
        set({ activeTab: tab });
      },
    }),
    {
      name: "active-tab-storage", // Persists across refreshes
    }
  )
);
