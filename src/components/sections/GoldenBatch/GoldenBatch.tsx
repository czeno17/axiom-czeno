import { useState } from "react";
import { Activity } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { useEvents } from "@/hooks/useEvents";
import { PARAMS, PRODUCT_LINES } from "@/services/data/constants";
import { BATCH_SERIES } from "@/services/data/utils";
import { ParameterChart } from "./ParameterChart";
import { FactorBar } from "./FactorBar";
import { CorrelatedRCAs } from "./CorrelatedRCAs";

export function GoldenBatch() {
  const { events } = useEvents();
  const [lineIdx, setLineIdx] = useState(0);
  const line = PRODUCT_LINES[lineIdx];
  const series = BATCH_SERIES[lineIdx];

  const lineEvents = events.filter((e) => e.productLine === line);
  const nightShiftCount = lineEvents.filter((e) => e.shift === "Night").length;
  const relevantCategoryCount = lineEvents.filter(
    (e) => e.category === "Flatness" || e.category === "Material Composition" || e.category === "Thermal Performance"
  ).length;
  const totalCount = lineEvents.length || 1;

  const supplierCounts: Record<string, number> = {};
  lineEvents.forEach((e) => {
    if (e.supplier) supplierCounts[e.supplier] = (supplierCounts[e.supplier] || 0) + 1;
  });
  const topSupplier = Object.entries(supplierCounts).sort((a, b) => b[1] - a[1])[0];

  const correlated = lineEvents
    .filter(
      (e) =>
        (e.category === "Flatness" || e.category === "Material Composition" || e.category === "Thermal Performance") &&
        e.rootCauseDescription
    )
    .slice(0, 3);

  return (
    <div>
      <SectionHeader
        icon={Activity}
        title="Golden Batch Optimization"
        subtitle="Real-time parameter monitoring against statistically-derived Golden Windows (mean ± 3σ from historical batches)."
      />
      <div className="flex gap-2 mb-4">
        {PRODUCT_LINES.map((l, i) => (
          <button
            key={l}
            onClick={() => setLineIdx(i)}
            className={`px-3 py-1.5 rounded text-xs font-medium border ${i === lineIdx ? "bg-indigo-600 text-white border-indigo-600" : "bg-white border-slate-300 text-slate-600"}`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {PARAMS.map((p) => (
          <ParameterChart key={p.key} param={p} series={series} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <p className="text-sm font-medium mb-3">Why? Top factors correlated with quality events on this line</p>
          <div className="space-y-2">
            <FactorBar label={`Night shift share of events (${nightShiftCount}/${totalCount})`} pct={Math.round((nightShiftCount / totalCount) * 100)} />
            <FactorBar label={`Flatness/Material/Thermal share (${relevantCategoryCount}/${totalCount})`} pct={Math.round((relevantCategoryCount / totalCount) * 100)} />
            {topSupplier && (
              <FactorBar label={`Top implicated supplier: ${topSupplier[0]} (${topSupplier[1]}/${totalCount})`} pct={Math.round((topSupplier[1] / totalCount) * 100)} />
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-3">Computed live from this line's indexed event history.</p>
        </Card>
        <CorrelatedRCAs events={correlated} />
      </div>
    </div>
  );
}
