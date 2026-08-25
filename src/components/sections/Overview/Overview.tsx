import { LayoutDashboard, Info } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { useEvents } from "@/hooks/useEvents";
import { useAuditStore } from "@/stores/auditStore";
import { CATEGORIES, CATEGORY_COLORS, ORG_NAME } from "@/services/data/constants";
import { OverviewStats } from "./OverviewStats";
import { RecentActivity } from "./RecentActivity";

export function Overview() {
  const { events } = useEvents();
  const auditLog = useAuditStore((s) => s.auditLog);

  const catCounts = CATEGORIES.map((c) => ({
    name: c,
    value: events.filter((e) => e.category === c).length,
  })).filter((c) => c.value > 0);

  return (
    <div>
      <SectionHeader
        icon={LayoutDashboard}
        title="Overview"
        subtitle={`Every quality decision, backed by evidence already indexed for ${ORG_NAME}.`}
      />
      <OverviewStats events={events} />
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 col-span-1">
          <p className="text-sm font-medium mb-2">Events by category</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={catCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={(d) => d.name}>
                {catCounts.map((c) => (
                  <Cell key={c.name} fill={CATEGORY_COLORS[c.name]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <RecentActivity auditLog={auditLog} />
      </div>
      <p className="text-xs text-slate-400 mt-6 flex items-center gap-1">
        <Info className="w-3.5 h-3.5" /> This is an interactive demo. Classification, similarity search, and
        drift detection run entirely in your browser using TF-IDF cosine similarity and rule-based heuristics —
        no data leaves this session and no external LLM API is called.
      </p>
    </div>
  );
}
