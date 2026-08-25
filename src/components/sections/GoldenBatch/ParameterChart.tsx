import { AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea, ReferenceLine } from "recharts";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { chartEnterProps } from "@/components/animations/ChartAnimations";
import type { BatchParamDef, BatchPoint } from "@/types";

export function ParameterChart({ param, series }: { param: BatchParamDef; series: BatchPoint[] }) {
  const upper = param.mean + 3 * param.sigma;
  const lower = param.mean - 3 * param.sigma;
  const latest = series[series.length - 1][param.key] as number;
  const z = (latest - param.mean) / param.sigma;
  const drifting = Math.abs(z) > 3;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">{param.label}</p>
        {drifting ? (
          <Badge className="bg-rose-100 text-rose-800 border-rose-300">
            <AlertTriangle className="w-3 h-3 inline mr-1" />
            Drift detected
          </Badge>
        ) : (
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">Within window</Badge>
        )}
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={series} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="hour" tick={{ fontSize: 9 }} interval={5} />
          <YAxis tick={{ fontSize: 9 }} domain={[lower - param.sigma, upper + param.sigma]} />
          <Tooltip />
          <ReferenceArea y1={lower} y2={upper} fill="#4f46e5" fillOpacity={0.08} />
          <ReferenceLine y={param.mean} stroke="#4f46e5" strokeDasharray="4 2" />
          <Line type="monotone" dataKey={param.key} stroke={drifting ? "#e11d48" : "#0f766e"} strokeWidth={2} dot={false} {...chartEnterProps} />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-[11px] text-slate-400 mt-1 font-mono">
        golden window: {lower.toFixed(1)} – {upper.toFixed(1)} · latest: {latest} · z={z.toFixed(2)}
      </p>
    </Card>
  );
}
