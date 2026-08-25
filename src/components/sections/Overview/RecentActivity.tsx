import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { fmtDate } from "@/utils/date";
import type { AuditEntry } from "@/types";

function actionClass(action: string) {
  if (action === "Rejected") return "bg-rose-100 text-rose-700 border-rose-300";
  if (action === "Edited") return "bg-amber-100 text-amber-800 border-amber-300";
  return "bg-emerald-100 text-emerald-700 border-emerald-300";
}

export function RecentActivity({ auditLog }: { auditLog: AuditEntry[] }) {
  return (
    <Card className="p-4 col-span-2">
      <p className="text-sm font-medium mb-3">Recent audit activity</p>
      <div className="space-y-2 font-mono text-xs">
        {auditLog.slice(0, 6).map((a) => (
          <div key={a.id} className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="text-slate-400 w-24 shrink-0">{fmtDate(a.ts)}</span>
            <Badge className={actionClass(a.action)}>{a.action}</Badge>
            <span className="text-slate-700">{a.eventId}</span>
            <span className="text-slate-400">{a.field}</span>
            <span className="text-slate-600 truncate">{a.actor}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
