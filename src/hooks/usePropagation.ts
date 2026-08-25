import { useMemo, useState } from "react";
import { useEvents } from "./useEvents";
import { useAuditStore } from "@/stores/auditStore";
import { usePropagationStore } from "@/stores/propagationStore";
import { computePropagationCandidates } from "@/services/ai/propagator";
import { NOW } from "@/services/data/constants";
import type { PropagationCandidate, QualityEvent } from "@/types";

export function usePropagation() {
  const { events, addEvent, corpusVectors } = useEvents();
  const logAudit = useAuditStore((s) => s.logAudit);
  const { propagated, markPropagated } = usePropagationStore();

  const closedWithRca = useMemo(
    () => events.filter((e) => e.status === "Closed" && e.rootCauseDescription),
    [events]
  );
  const [selectedId, setSelectedId] = useState<string>("");
  const selected = events.find((e) => e.id === selectedId) || closedWithRca[0] || null;

  const candidates: PropagationCandidate[] = useMemo(() => {
    if (!selected) return [];
    return computePropagationCandidates(selected, events, corpusVectors);
  }, [selected, events, corpusVectors]);

  function convert(line: string, candidate: PropagationCandidate) {
    if (!selected) return;
    const num = events.length + 1;
    const eventId = `CAPA-2608-P${num}`;
    const newEvent: QualityEvent = {
      id: eventId, eventId, type: "CAPA",
      title: `Preventive action: propagate ${selected.eventId} root cause to ${line}`,
      description: `Preventive action created from Propagation Report. Root cause "${selected.rootCauseDescription}" from ${selected.eventId} (${selected.productLine}) was scored ${candidate.total}% likely to recur on ${line} based on shared supplier/material/category signals.`,
      severity: selected.severity, category: selected.category, status: "Open",
      rootCauseCategory: selected.rootCauseCategory, rootCauseDescription: "", correctiveAction: "",
      preventiveAction: `Apply preventive action from ${selected.eventId}: ${selected.preventiveAction}`, effectiveness: null,
      productLine: line, subAssembly: selected.subAssembly, supplier: selected.supplier, materialLot: "",
      operator: "", shift: "Day", assignedEngineer: selected.assignedEngineer,
      createdAt: NOW.toISOString(), closedAt: null,
      aiSuggestedSeverity: selected.severity, aiSuggestedCategory: selected.category,
      aiConfidence: candidate.total / 100, humanAccepted: true,
    };
    addEvent(newEvent);
    markPropagated(line, eventId);
    logAudit({
      actor: "Quality Manager",
      action: "Accepted",
      eventId,
      field: "propagation",
      before: "—",
      after: `Created from ${selected.eventId}`,
      reason: `Propagation score ${candidate.total}%`,
    });
  }

  return { closedWithRca, selected, selectedId, setSelectedId, candidates, propagated, convert };
}
