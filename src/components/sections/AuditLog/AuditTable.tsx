import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { fmtDate } from "@/utils/date";
import type { AuditEntry } from "@/types";

function actionClass(action: string) {
  if (action === "Rejected") return "bg-rose-100 text-rose-700 border-rose-300";
  if (action === "Edited") return "bg-amber-100 text-amber-800 border-amber-300";
  if (action === "Nudge Sent") return "bg-sky-100 text-sky-700 border-sky-300";
  return "bg-emerald-100 text-emerald-700 border-emerald-300";
}

export function AuditTable({ entries }: { entries: AuditEntry[] }) {
  return (
    <Card className="p-0 overflow-hidden">
      <table className="w-full text-xs font-mono">
        <thead className="bg-slate-100 text-slate-500">
          <tr>
            <th className="text-left px-3 py-2">Timestamp</th>
            <th className="text-left px-3 py-2">Actor</th>
            <th className="text-left px-3 py-2">Action</th>
            <th className="text-left px-3 py-2">Event</th>
            <th className="text-left px-3 py-2">Field</th>
            <th className="text-left px-3 py-2">Before → After</th>
            <th className="text-left px-3 py-2">Reason</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((a) => (
            <tr key={a.id} className="border-t border-slate-100">
              <td className="px-3 py-2 text-slate-400">{fmtDate(a.ts)}</td>
              <td className="px-3 py-2">{a.actor}</td>
              <td className="px-3 py-2">
                <Badge className={actionClass(a.action)}>{a.action}</Badge>
              </td>
              <td className="px-3 py-2">{a.eventId}</td>
              <td className="px-3 py-2">{a.field}</td>
              <td className="px-3 py-2 text-slate-500">
                {a.before} → {a.after}
              </td>
              <td className="px-3 py-2 text-slate-500 max-w-xs truncate">{a.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
