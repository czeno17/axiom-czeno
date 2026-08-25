import { ListChecks } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { useTriage } from "@/hooks/useTriage";
import { IntakeForm } from "./IntakeForm";
import { AISuggestions } from "./AISuggestions";
import { SimilaritySnapshot } from "./SimilaritySnapshot";

export function Triage() {
  const { form, setForm, analysis, decisions, setDecision, reasons, setReason, submittedId, runAnalysis, submit } =
    useTriage();

  return (
    <div>
      <SectionHeader
        icon={ListChecks}
        title="Intelligent CAPA Triage"
        subtitle="Intake a new NCR. Czeno suggests category, severity, and assignee, and surfaces the most similar past events for context — you stay in control of every decision."
      />
      <div className="grid grid-cols-2 gap-6">
        <IntakeForm form={form} setForm={setForm} onAnalyze={runAnalysis} />
        <div>
          {!analysis && (
            <Card className="p-5 h-full flex items-center justify-center text-center text-slate-400 text-sm">
              Fill in the NCR and click "Analyze with Czeno" to see AI suggestions and the Similarity Snapshot.
            </Card>
          )}
          {analysis && (
            <div className="space-y-4">
              <AISuggestions
                analysis={analysis}
                decisions={decisions}
                setDecision={setDecision}
                reasons={reasons}
                setReason={setReason}
                submittedId={submittedId}
                onSubmit={submit}
              />
              <SimilaritySnapshot similar={analysis.similar} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
