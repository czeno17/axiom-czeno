import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CitationChip } from "@/components/ui/CitationChip";
import { PropagationScore } from "./PropagationScore";
import type { PropagationCandidate, QualityEvent } from "@/types";

interface CandidateListProps {
  candidates: PropagationCandidate[];
  selected: QualityEvent;
  propagated: Record<string, string>;
  onConvert: (line: string, candidate: PropagationCandidate) => void;
}

export function CandidateList({ candidates, selected, propagated, onConvert }: CandidateListProps) {
  if (candidates.length === 0) {
    return <p className="text-sm text-slate-400">No cross-line propagation signals detected for this event.</p>;
  }

  return (
    <div className="space-y-3">
      {candidates.map((c) => (
        <Card key={c.line} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{c.line}</p>
              {c.evidence ? (
                <p className="text-xs text-slate-500 mt-0.5">
                  Evidence: <CitationChip id={c.evidence.eventId} /> shares{" "}
                  {c.evidence.supplier === selected.supplier ? "supplier" : ""}{" "}
                  {c.evidence.category === selected.category ? "category" : ""}
                </p>
              ) : (
                <p className="text-xs text-slate-500 mt-0.5">Shares supplier {selected.supplier}; no prior incident on this line yet</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <PropagationScore total={c.total} />
              {propagated[c.line] ? (
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  PA created
                </Badge>
              ) : (
                <button
                  onClick={() => onConvert(c.line, c)}
                  className="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium"
                >
                  Convert to Preventive Action
                </button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
