export function PropagationScore({ total }: { total: number }) {
  const colorClass = total >= 60 ? "text-rose-600" : total >= 40 ? "text-amber-600" : "text-slate-500";
  return (
    <div className="text-right">
      <p className={`text-lg font-semibold ${colorClass}`}>{total}%</p>
      <p className="text-[10px] text-slate-400">recurrence probability</p>
    </div>
  );
}
