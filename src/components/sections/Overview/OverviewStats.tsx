import { Card } from "@/components/ui/Card";
import type { QualityEvent } from "@/types";

export function OverviewStats({ events }: { events: QualityEvent[] }) {
  const open = events.filter((e) => e.status === "Open").length;
  const closed = events.filter((e) => e.status === "Closed");
  const withRca = closed.filter((e) => e.rootCauseDescription);
  const rcaRate = closed.length ? Math.round((withRca.length / closed.length) * 100) : 0;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <p className="text-xs text-slate-500 uppercase tracking-wide">Open events</p>
        <p className="text-2xl font-semibold mt-1">{open}</p>
      </Card>
      <Card className="p-4">
        <p className="text-xs text-slate-500 uppercase tracking-wide">RCA completion rate</p>
        <p className={`text-2xl font-semibold mt-1 ${rcaRate < 80 ? "text-rose-600" : "text-emerald-600"}`}>
          {rcaRate}%
        </p>
      </Card>
      <Card className="p-4">
        <p className="text-xs text-slate-500 uppercase tracking-wide">Total indexed events</p>
        <p className="text-2xl font-semibold mt-1">{events.length}</p>
      </Card>
      <Card className="p-4">
        <p className="text-xs text-slate-500 uppercase tracking-wide">Avg triage time (est.)</p>
        <p className="text-2xl font-semibold mt-1 text-indigo-600">~3 min</p>
        <p className="text-[11px] text-slate-400">vs. 20 min manual baseline</p>
      </Card>
    </div>
  );
}
