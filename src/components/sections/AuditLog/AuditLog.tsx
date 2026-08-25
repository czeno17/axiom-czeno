import { ScrollText } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useAuditStore } from "@/stores/auditStore";
import { AuditTable } from "./AuditTable";

export function AuditLog() {
  const auditLog = useAuditStore((s) => s.auditLog);
  return (
    <div>
      <SectionHeader
        icon={ScrollText}
        title="Audit Trail"
        subtitle="Every AI suggestion, and every accept / edit / reject decision made against it, in one immutable ledger."
      />
      <AuditTable entries={auditLog} />
    </div>
  );
}
