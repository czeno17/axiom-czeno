// src/components/sections/Overview/index.tsx

import { SEED_EVENTS } from "@/services/data/seedData";

export function Overview() {
  const totalEvents = SEED_EVENTS?.length || 0;
  const openEvents = SEED_EVENTS?.filter((e) => e.status === "Open").length || 0;
  const closedEvents = SEED_EVENTS?.filter((e) => e.status === "Closed").length || 0;
  const capas = SEED_EVENTS?.filter((e) => e.type === "CAPA").length || 0;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Overview</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-slate-500">Total Events</p>
          <p className="text-2xl font-bold">{totalEvents}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-slate-500">Open Events</p>
          <p className="text-2xl font-bold text-amber-600">{openEvents}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-slate-500">Closed Events</p>
          <p className="text-2xl font-bold text-emerald-600">{closedEvents}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-slate-500">CAPAs</p>
          <p className="text-2xl font-bold text-indigo-600">{capas}</p>
        </div>
      </div>
    </div>
  );
}
