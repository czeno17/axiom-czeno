// src/components/sections/GoldenBatch/CorrelatedRCAs.tsx

import { Card } from "@/components/ui/Card";

interface CorrelatedRCAsProps {
  events: any[];
}

export function CorrelatedRCAs({ events }: CorrelatedRCAsProps) {
  return (
    <Card className="p-4">
      <p className="text-sm font-medium mb-3">Correlated RCAs on this line</p>
      {events.length === 0 ? (
        <p className="text-sm text-slate-400">No correlated RCAs found.</p>
      ) : (
        <div className="space-y-2">
          {events.map((e) => (
            <div key={e.id} className="p-2 bg-slate-50 rounded-lg">
              <p className="text-xs font-medium">{e.id}</p>
              <p className="text-xs text-slate-600 line-clamp-2">{e.rootCauseDescription}</p>
            </div>
          ))}
        </div>
      )}
      <p className="text-[11px] text-slate-400 mt-3">
        RCAs from events with similar category signals.
      </p>
    </Card>
  );
}
