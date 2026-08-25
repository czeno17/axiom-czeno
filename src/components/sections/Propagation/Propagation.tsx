import { GitBranch } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { CitationChip } from "@/components/ui/CitationChip";
import { usePropagation } from "@/hooks/usePropagation";
import { CandidateList } from "./CandidateList";

export function Propagation() {
  const { closedWithRca, selected, selectedId, setSelectedId, candidates, propagated, convert } = usePropagation();

  return (
    <div>
      <SectionHeader
        icon={GitBranch}
        title="Predictive CAPA Propagation"
        subtitle="When a CAPA closes, Czeno scans other lines for shared suppliers, materials, and categories to flag where the same failure could recur."
      />
      <Card className="p-4 mb-4">
        <label className="text-xs text-slate-500">Closed CAPA / NCR with a documented root cause</label>
        <select
          className="w-full mt-1 border border-slate-300 rounded px-3 py-2 text-sm"
          value={selectedId || selected?.id || ""}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {closedWithRca.map((e) => (
            <option key={e.id} value={e.id}>
              {e.eventId} — {e.title}
            </option>
          ))}
        </select>
      </Card>

      {selected && (
        <Card className="p-4 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <CitationChip id={selected.eventId} />
            <span className="text-xs text-slate-500">
              {selected.productLine} · {selected.supplier}
            </span>
          </div>
          <p className="text-sm text-slate-700">{selected.rootCauseDescription}</p>
        </Card>
      )}

      {selected && <CandidateList candidates={candidates} selected={selected} propagated={propagated} onConvert={convert} />}
    </div>
  );
}
