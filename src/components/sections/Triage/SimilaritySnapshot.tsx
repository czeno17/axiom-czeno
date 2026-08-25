import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CitationChip } from "@/components/ui/CitationChip";
import { SEVERITY_BADGE } from "@/services/data/constants";
import type { SimilarityMatch } from "@/types";

export function SimilaritySnapshot({ similar }: { similar: SimilarityMatch[] }) {
  return (
    <Card className="p-5">
      <p className="text-sm font-medium mb-3">Similarity Snapshot — top 3 historical matches</p>
      <div className="space-y-3">
        {similar.map(({ event, score }) => (
          <div key={event.id} className="border border-slate-200 rounded p-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <CitationChip id={event.eventId} />
                <Badge className={SEVERITY_BADGE[event.severity]}>{event.severity}</Badge>
                <span className="text-xs text-slate-500">{event.productLine}</span>
              </div>
              <span className="text-xs font-mono text-indigo-600">{Math.round(score * 100)}% match</span>
            </div>
            <p className="text-sm font-medium text-slate-800">{event.title}</p>
            {event.rootCauseDescription && (
              <p className="text-xs text-slate-500 mt-1">
                <span className="font-medium text-slate-600">Root cause: </span>
                {event.rootCauseDescription}
              </p>
            )}
            {event.correctiveAction && (
              <p className="text-xs text-slate-500 mt-0.5">
                <span className="font-medium text-slate-600">Fix: </span>
                {event.correctiveAction}{" "}
                {event.effectiveness === true
                  ? "(confirmed effective)"
                  : event.effectiveness === false
                  ? "(later found not fully effective)"
                  : ""}
              </p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
