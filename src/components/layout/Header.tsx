import { fmtDate } from "@/utils/date";
import { NOW } from "@/services/data/constants";
import { useEvents } from "@/hooks/useEvents";

export function Header() {
  const { corpusVectors } = useEvents();
  return (
    <div className="bg-slate-900 text-slate-400 text-xs font-mono px-6 py-1.5 flex items-center gap-6">
      <span className="text-emerald-400">● live</span>
      <span>corpus vectors: {corpusVectors.length}</span>
      <span>similarity engine: TF-IDF cosine (client-side)</span>
      <span className="ml-auto">reference date: {fmtDate(NOW.toISOString())}</span>
    </div>
  );
}
