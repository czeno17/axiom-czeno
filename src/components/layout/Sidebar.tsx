import { ShieldCheck } from "lucide-react";
import { NAV_ITEMS } from "@/config/navigation";
import { useUiStore } from "@/stores/uiStore";
import { useEvents } from "@/hooks/useEvents";
import { APP_NAME, APP_TAGLINE } from "@/config/constants";

export function Sidebar() {
  const activeTab = useUiStore((s) => s.activeTab);
  const setActiveTab = useUiStore((s) => s.setActiveTab);
  const { events, avgConfidence } = useEvents();

  return (
    <aside className="w-56 shrink-0 bg-slate-950 text-slate-300 flex flex-col">
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2 text-white font-semibold text-lg">
          <ShieldCheck className="w-6 h-6 text-indigo-400" /> {APP_NAME}
        </div>
        <p className="text-xs text-slate-500 mt-1">{APP_TAGLINE}</p>
      </div>
      <nav className="flex-1 py-3">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm text-left transition-colors ${
              activeTab === item.id ? "bg-indigo-600 text-white" : "hover:bg-slate-900 text-slate-300"
            }`}
          >
            <item.icon className="w-4 h-4" /> {item.label}
          </button>
        ))}
      </nav>
      <div className="px-5 py-4 border-t border-slate-800 text-xs text-slate-500 font-mono leading-relaxed">
        events indexed: {events.length}
        <br /> avg confidence: {Math.round(avgConfidence * 100)}%
      </div>
    </aside>
  );
}
