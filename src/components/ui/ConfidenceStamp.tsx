import { Sparkles } from "lucide-react";

export function ConfidenceStamp({ confidence }: { confidence: number }) {
  const pct = Math.round(confidence * 100);
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-dashed border-amber-400 bg-amber-50 text-amber-800 text-xs font-mono">
      <Sparkles className="w-3 h-3" /> AI {pct}%
    </span>
  );
}
