import { ClipboardCheck } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useEvents } from "@/hooks/useEvents";
import { NOW, OVERDUE_DAYS_THRESHOLD, PRODUCT_LINES } from "@/services/data/constants";
import { daysBetween } from "@/utils/date";
import { CompletionChart, type LineCompletion } from "./CompletionChart";
import { OverdueList } from "./OverdueList";

export function RCAQuality() {
  const { events } = useEvents();

  const byLine: LineCompletion[] = PRODUCT_LINES.map((line) => {
    const lineClosed = events.filter((e) => e.productLine === line && e.status === "Closed");
    const withRca = lineClosed.filter((e) => e.rootCauseDescription);
    return {
      line,
      rate: lineClosed.length ? Math.round((withRca.length / lineClosed.length) * 100) : 100,
      total: lineClosed.length,
    };
  });

  const overdue = events.filter(
    (e) => e.status === "Open" && !e.rootCauseDescription && daysBetween(new Date(e.createdAt), NOW) > OVERDUE_DAYS_THRESHOLD
  );

  return (
    <div>
      <SectionHeader
        icon={ClipboardCheck}
        title="RCA Data Quality Dashboard"
        subtitle={`Visibility into root-cause-analysis completion, with automatic nudges for NCRs open more than ${OVERDUE_DAYS_THRESHOLD} days without an RCA.`}
      />
      <CompletionChart data={byLine} />
      <OverdueList overdue={overdue} />
    </div>
  );
}
