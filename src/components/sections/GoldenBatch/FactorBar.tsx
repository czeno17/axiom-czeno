export function FactorBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-slate-600 mb-0.5">
        <span>{label}</span>
        <span className="font-mono">{pct}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded overflow-hidden">
        <div className="h-full bg-indigo-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
