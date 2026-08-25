import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PRODUCT_LINES, SHIFTS, SUPPLIERS } from "@/services/data/constants";
import type { TriageFormState } from "@/types";

interface IntakeFormProps {
  form: TriageFormState;
  setForm: (form: TriageFormState) => void;
  onAnalyze: () => void;
}

export function IntakeForm({ form, setForm, onAnalyze }: IntakeFormProps) {
  return (
    <Card className="p-5">
      <p className="text-sm font-medium mb-3">New NCR intake</p>
      <div className="space-y-3">
        <div>
          <label className="text-xs text-slate-500">Title</label>
          <input
            className="w-full mt-1 border border-slate-300 rounded px-3 py-2 text-sm"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Flatness out of tolerance on heat sink base"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500">Description</label>
          <textarea
            className="w-full mt-1 border border-slate-300 rounded px-3 py-2 text-sm"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe what was observed, where, and any pattern noticed..."
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-500">Product line</label>
            <select className="w-full mt-1 border border-slate-300 rounded px-3 py-2 text-sm" value={form.productLine} onChange={(e) => setForm({ ...form, productLine: e.target.value })}>
              {PRODUCT_LINES.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500">Supplier</label>
            <select className="w-full mt-1 border border-slate-300 rounded px-3 py-2 text-sm" value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })}>
              {SUPPLIERS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500">Sub-assembly</label>
            <input className="w-full mt-1 border border-slate-300 rounded px-3 py-2 text-sm" value={form.subAssembly} onChange={(e) => setForm({ ...form, subAssembly: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-slate-500">Material lot</label>
            <input className="w-full mt-1 border border-slate-300 rounded px-3 py-2 text-sm" value={form.materialLot} onChange={(e) => setForm({ ...form, materialLot: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-slate-500">Operator</label>
            <input className="w-full mt-1 border border-slate-300 rounded px-3 py-2 text-sm" value={form.operator} onChange={(e) => setForm({ ...form, operator: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-slate-500">Shift</label>
            <select className="w-full mt-1 border border-slate-300 rounded px-3 py-2 text-sm" value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value as TriageFormState["shift"] })}>
              {SHIFTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={onAnalyze} className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded px-4 py-2 text-sm font-medium flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" /> Analyze with Czeno
        </button>
        <p className="text-xs text-slate-400">
          Try: "Heat sink base flatness measuring 0.065mm on Line A, Supplier A aluminum billet" — to see the
          residual-stress thread surface.
        </p>
      </div>
    </Card>
  );
}
