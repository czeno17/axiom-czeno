import { CheckCircle2, XCircle } from "lucide-react";
import { ConfidenceStamp } from "@/components/ui/ConfidenceStamp";

interface DecisionRowProps {
  label: string;
  aiValue: string;
  aiConfidence: number;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  reason?: string;
  onReason: (r: string) => void;
}

export function DecisionRow({ label, aiValue, aiConfidence, options, value, onChange, reason, onReason }: DecisionRowProps) {
  const differs = value !== aiValue;
  return (
    <div className="mb-4 pb-4 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-slate-600">{label}</span>
        <ConfidenceStamp confidence={aiConfidence} />
      </div>
      <div className="flex items-center gap-2">
        <select className="flex-1 border border-slate-300 rounded px-2 py-1.5 text-sm" value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <button
          title="Accept AI suggestion"
          onClick={() => onChange(aiValue)}
          className={`p-1.5 rounded border ${!differs ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "border-slate-300 text-slate-400 hover:text-emerald-600"}`}
        >
          <CheckCircle2 className="w-4 h-4" />
        </button>
        <button title="Reject suggestion" onClick={() => onChange("")} className="p-1.5 rounded border border-slate-300 text-slate-400 hover:text-rose-600">
          <XCircle className="w-4 h-4" />
        </button>
      </div>
      <p className="text-[11px] text-slate-400 mt-1">AI suggested: {aiValue}</p>
      {differs && (
        <input
          className="w-full mt-1.5 border border-amber-300 rounded px-2 py-1 text-xs"
          placeholder="Reason for change (logged to audit trail)"
          value={reason || ""}
          onChange={(e) => onReason(e.target.value)}
        />
      )}
    </div>
  );
}
