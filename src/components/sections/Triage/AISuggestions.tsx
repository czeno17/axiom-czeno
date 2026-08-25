import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CATEGORIES, ENGINEERS } from "@/services/data/constants";
import { DecisionRow } from "./DecisionRow";
import type { TriageAnalysis } from "@/types";

interface AISuggestionsProps {
  analysis: TriageAnalysis;
  decisions: { category: string; severity: string; assignee: string };
  setDecision: (field: "category" | "severity" | "assignee", value: string) => void;
  reasons: Record<string, string>;
  setReason: (field: string, value: string) => void;
  submittedId: string | null;
  onSubmit: () => void;
}

export function AISuggestions({ analysis, decisions, setDecision, reasons, setReason, submittedId, onSubmit }: AISuggestionsProps) {
  return (
    <Card className="p-5">
      <p className="text-sm font-medium mb-3">AI suggestions — human-in-the-loop</p>
      <DecisionRow
        label="Category" aiValue={analysis.category.category} aiConfidence={analysis.category.confidence}
        options={CATEGORIES} value={decisions.category} onChange={(v) => setDecision("category", v)}
        reason={reasons.category} onReason={(r) => setReason("category", r)}
      />
      <DecisionRow
        label="Severity" aiValue={analysis.severity.severity} aiConfidence={analysis.severity.confidence}
        options={["Minor", "Major", "Critical"]} value={decisions.severity} onChange={(v) => setDecision("severity", v)}
        reason={reasons.severity} onReason={(r) => setReason("severity", r)}
      />
      <DecisionRow
        label="Assignee" aiValue={analysis.assignee.assignee} aiConfidence={analysis.assignee.confidence}
        options={ENGINEERS} value={decisions.assignee} onChange={(v) => setDecision("assignee", v)}
        reason={reasons.assignee} onReason={(r) => setReason("assignee", r)}
      />
      <button onClick={onSubmit} className="w-full mt-3 bg-slate-900 hover:bg-black text-white rounded px-4 py-2 text-sm font-medium">
        Log NCR and record decisions
      </button>
      {submittedId && (
        <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> {submittedId} logged. Every accept/edit/reject was written to
          the audit trail.
        </p>
      )}
    </Card>
  );
}
