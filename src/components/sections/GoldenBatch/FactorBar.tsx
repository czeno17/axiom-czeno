// src/components/sections/GoldenBatch/FactorBar.tsx

interface FactorBarProps {
  label: string;
  pct: number;
}

export function FactorBar({ label, pct }: FactorBarProps) {
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium">{pct}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 mt-1">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  );
}
