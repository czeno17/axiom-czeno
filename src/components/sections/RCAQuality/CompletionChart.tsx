import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts";
import { Card } from "@/components/ui/Card";
import { chartEnterProps } from "@/components/animations/ChartAnimations";
import { RCA_TARGET_RATE } from "@/services/data/constants";

export interface LineCompletion {
  line: string;
  rate: number;
  total: number;
}

export function CompletionChart({ data }: { data: LineCompletion[] }) {
  return (
    <Card className="p-4 mb-6">
      <p className="text-sm font-medium mb-3">RCA completion rate by product line</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="line" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Tooltip />
          <ReferenceLine y={RCA_TARGET_RATE} stroke="#e11d48" strokeDasharray="4 2" label={{ value: `${RCA_TARGET_RATE}% target`, fontSize: 10, fill: "#e11d48" }} />
          <Bar dataKey="rate" radius={[4, 4, 0, 0]} {...chartEnterProps}>
            {data.map((b) => (
              <Cell key={b.line} fill={b.rate < RCA_TARGET_RATE ? "#e11d48" : "#4f46e5"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
