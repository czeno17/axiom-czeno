// src/stores/auditStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuditEntry } from "@/types";
import { INITIAL_AUDIT } from "@/services/data/seedData";

interface AuditStoreState {
  auditLog: AuditEntry[];
  logAudit: (entry: Omit<AuditEntry, "id" | "ts">) => void;
  clearAudit: () => void;
}

export const useAuditStore = create<AuditStoreState>()(
  persist(
    (set) => ({
      auditLog: INITIAL_AUDIT || [],
      logAudit: (entry) =>
        set((state) => ({
          auditLog: [
            {
              ...entry,
              id: `AUDIT-${Date.now()}`,
              ts: new Date().toISOString(),
            },
            ...state.auditLog,
          ],
        })),
      clearAudit: () => set({ auditLog: [] }),
    }),
    {
      name: "audit-store",
    }
  )
);
