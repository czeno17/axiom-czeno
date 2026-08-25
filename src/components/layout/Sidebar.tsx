// src/components/layout/Sidebar.tsx

import { useActiveTabStore } from "@/stores/activeTabStore";

export function Sidebar() {
  const { activeTab, setActiveTab } = useActiveTabStore();

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

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen sticky top-0 overflow-y-auto">
      <div className="p-4 border-b border-slate-700">
        <h1 className="text-xl font-bold text-white">CZENO</h1>
        <p className="text-xs text-slate-400">Intelligent Quality Layer</p>
      </div>

      <nav className="p-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                isActive
                  ? "bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/20"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="text-lg">•</span>
              <span>{item.label}</span>
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
        <p className="text-xs text-slate-500">v1.0.0</p>
      </div>
    </aside>
  );
}
