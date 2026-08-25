import { useState } from "react";
import { useEvents } from "./useEvents";
import { useAuditStore } from "@/stores/auditStore";
import { classifyCategory, classifySeverity, suggestAssignee } from "@/services/ai/classifier";
import { findSimilarEvents } from "@/services/ai/similarity";
import { NOW, PRODUCT_LINES, SUPPLIERS } from "@/services/data/constants";
import type { QualityEvent, TriageAnalysis, TriageFormState } from "@/types";

const EMPTY_FORM: TriageFormState = {
  title: "",
  description: "",
  productLine: PRODUCT_LINES[0],
  subAssembly: "",
  supplier: SUPPLIERS[0],
  materialLot: "",
  operator: "",
  shift: "Day",
};

export function useTriage() {
  const { events, addEvent, corpusVectors, corpusIdf } = useEvents();
  const logAudit = useAuditStore((s) => s.logAudit);

  const [form, setForm] = useState<TriageFormState>(EMPTY_FORM);
  const [analysis, setAnalysis] = useState<TriageAnalysis | null>(null);
  const [decisions, setDecisions] = useState({ category: "", severity: "", assignee: "" });
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  function runAnalysis() {
    if (!form.title.trim() && !form.description.trim()) return;
    const text = `${form.title} ${form.description}`;
    const category = classifyCategory(text);
    const severity = classifySeverity(text);
    const assignee = suggestAssignee(events, category.category, form.productLine);
    const similar = findSimilarEvents(events, corpusVectors, corpusIdf, text, 3);

    setAnalysis({ category, severity, assignee, similar });
    setDecisions({ category: category.category, severity: severity.severity, assignee: assignee.assignee });
    setReasons({});
    setSubmittedId(null);
  }

  function submit() {
    if (!analysis) return;
    const num = events.length + 1;
    const eventId = `NCR-2608-${String(num).padStart(2, "0")}`;

    const newEvent: QualityEvent = {
      id: eventId, eventId, type: "NCR", title: form.title, description: form.description,
      severity: decisions.severity as QualityEvent["severity"], category: decisions.category, status: "Open",
      rootCauseCategory: "", rootCauseDescription: "", correctiveAction: "", preventiveAction: "", effectiveness: null,
      productLine: form.productLine, subAssembly: form.subAssembly, supplier: form.supplier, materialLot: form.materialLot,
      operator: form.operator, shift: form.shift, assignedEngineer: decisions.assignee,
      createdAt: NOW.toISOString(), closedAt: null,
      aiSuggestedSeverity: analysis.severity.severity, aiSuggestedCategory: analysis.category.category,
      aiConfidence: (analysis.category.confidence + analysis.severity.confidence) / 2,
      humanAccepted: decisions.category === analysis.category.category && decisions.severity === analysis.severity.severity,
    };
    addEvent(newEvent);

    const fields = [
      { field: "category", ai: analysis.category.category, final: decisions.category },
      { field: "severity", ai: analysis.severity.severity, final: decisions.severity },
      { field: "assignee", ai: analysis.assignee.assignee, final: decisions.assignee },
    ];
    fields.forEach((f) => {
      const action = f.final === f.ai ? "Accepted" : "Edited";
      logAudit({
        actor: "Quality Engineer",
        action,
        eventId,
        field: f.field,
        before: f.ai,
        after: f.final,
        reason: reasons[f.field] || (action === "Accepted" ? "Matches AI suggestion" : ""),
      });
    });

    setSubmittedId(eventId);
    setForm(EMPTY_FORM);
    setAnalysis(null);
    setDecisions({ category: "", severity: "", assignee: "" });
  }

  function setDecision(field: "category" | "severity" | "assignee", value: string) {
    setDecisions((prev) => ({ ...prev, [field]: value }));
  }
  function setReason(field: string, value: string) {
    setReasons((prev) => ({ ...prev, [field]: value }));
  }

  return { form, setForm, analysis, decisions, setDecision, reasons, setReason, submittedId, runAnalysis, submit };
}
