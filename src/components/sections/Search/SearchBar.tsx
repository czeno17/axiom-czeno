import { Card } from "@/components/ui/Card";

interface SearchBarProps {
  query: string;
  setQuery: (v: string) => void;
  refine: string;
  setRefine: (v: string) => void;
  weight: number;
  setWeight: (v: number) => void;
}

export function SearchBar({ query, setQuery, refine, setRefine, weight, setWeight }: SearchBarProps) {
  return (
    <Card className="p-5 mb-4">
      <div className="flex gap-2">
        <input
          className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm"
          placeholder='Try: "flatness issues with Supplier A" or "heat pipe voiding"'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3 mt-3">
        <span className="text-xs text-slate-500 w-28">Keyword</span>
        <input type="range" min="0" max="1" step="0.05" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} className="flex-1" />
        <span className="text-xs text-slate-500 w-28 text-right">Semantic</span>
      </div>
      {query && (
        <div className="mt-3">
          <input
            className="w-full border border-slate-200 rounded px-3 py-1.5 text-xs"
            placeholder="Refine with a follow-up (e.g. add 'closed only')"
            value={refine}
            onChange={(e) => setRefine(e.target.value)}
          />
        </div>
      )}
    </Card>
  );
}
