import { useState } from "react";
import { Bell } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CitationChip } from "@/components/ui/CitationChip";
import { useAuditStore } from "@/stores/auditStore";
import { NOW, OVERDUE_DAYS_THRESHOLD } from "@/services/data/constants";
import { daysBetween } from "@/utils/date";
import type { QualityEvent } from "@/types";

export function OverdueList({ overdue }: { overdue: QualityEvent[] }) {
  const logAudit = useAuditStore((s) => s.logAudit);
  const [nudged, setNudged] = useState<Record<string, boolean>>({});

  function nudge(e: QualityEvent) {
    setNudged((prev) => ({ ...prev, [e.id]: true }));
    logAudit({
      actor: "Czeno",
      action: "Nudge Sent",
      eventId: e.eventId,
      field: "rootCauseDescription",
      before: "missing",
      after: "reminder sent",
      reason: `Open ${daysBetween(new Date(e.createdAt), NOW)} days without RCA`,
    });
  }

  return (
    <Card className="p-4">
      <p className="text-sm font-medium mb-3 flex items-center gap-2">
        <Bell className="w-4 h-4 text-amber-500" /> Overdue: open &gt; {OVERDUE_DAYS_THRESHOLD} days without RCA
      </p>
      {overdue.length === 0 && <p className="text-xs text-slate-400">Nothing overdue right now.</p>}
      <div className="space-y-2">
        {overdue.map((e) => (
          <div key={e.id} className="flex items-center justify-between border-b border-slate-100 pb-2 text-sm">
            <div>
              <div className="flex items-center gap-2">
                <CitationChip id={e.eventId} />
                <span className="font-medium">{e.title}</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {e.assignedEngineer} · {e.productLine} · open {daysBetween(new Date(e.createdAt), NOW)} days
              </p>
            </div>
            {nudged[e.id] ? (
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">Nudge sent</Badge>
            ) : (
              <button
                onClick={() => nudge(e)}
                className="px-3 py-1.5 rounded border border-amber-400 text-amber-700 text-xs font-medium hover:bg-amber-50 flex items-center gap-1"
              >
                <Bell className="w-3.5 h-3.5" /> Send nudge
              </button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
