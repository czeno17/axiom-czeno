import { create } from "zustand";
import type { AuditEntry, AuditEntryInput } from "@/types";
import { INITIAL_AUDIT } from "@/services/data/seedData";
import { NOW } from "@/services/data/constants";

interface AuditStoreState {
  auditLog: AuditEntry[];
  logAudit: (entry: AuditEntryInput) => void;
}

export const useAuditStore = create<AuditStoreState>((set) => ({
  auditLog: INITIAL_AUDIT,
  logAudit: (entry) =>
    set((state) => ({
      auditLog: [
        { id: `a${state.auditLog.length + 1}-${Date.now()}`, ts: NOW.toISOString(), ...entry },
        ...state.auditLog,
      ],
    })),
}));
