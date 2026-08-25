// src/components/layout/Header.tsx

import { useActiveTabStore } from "@/stores/activeTabStore";

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "triage", label: "CAPA Triage" },
  { id: "capa", label: "CAPA Management" },
  { id: "search", label: "Semantic Search" },
  { id: "goldenBatch", label: "Golden Batch" },
  { id: "propagation", label: "Propagation" },
  { id: "rcaQuality", label: "RCA Quality" },
  { id: "auditLog", label: "Audit Log" },
];

export function Header() {
  const { activeTab } = useActiveTabStore();
  const currentTab = navItems.find((item) => item.id === activeTab);

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">{currentTab?.label || "Dashboard"}</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">Welcome, Quality Engineer</span>
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
            QE
          </div>
        </div>
      </div>
    </header>
  );
}
