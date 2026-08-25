import { Card } from "@/components/ui/Card";
import { CitationChip } from "@/components/ui/CitationChip";
import { truncate } from "@/utils/formatting";
import type { QualityEvent } from "@/types";

export function CorrelatedRCAs({ events }: { events: QualityEvent[] }) {
  return (
    <Card className="p-4">
      <p className="text-sm font-medium mb-3">Correlated RCAs from past deviations</p>
      {events.length === 0 && <p className="text-xs text-slate-400">No matching historical RCAs for this line yet.</p>}
      <div className="space-y-2">
        {events.map((e) => (
          <div key={e.id} className="text-xs border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2 mb-0.5">
              <CitationChip id={e.eventId} />
              <span className="text-slate-500">{e.category}</span>
            </div>
            <p className="text-slate-600">{truncate(e.rootCauseDescription, 150)}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
