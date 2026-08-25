import { MainLayout } from "@/components/layout/MainLayout";
import { PageTransition } from "@/components/animations/PageTransition";
import { TransitionGroup } from "@/components/animations/TransitionGroup";
import { useUiStore } from "@/stores/uiStore";
import { Overview } from "@/components/sections/Overview/Overview";
import { Triage } from "@/components/sections/Triage/Triage";
import { SemanticSearch } from "@/components/sections/Search/SemanticSearch";
import { GoldenBatch } from "@/components/sections/GoldenBatch/GoldenBatch";
import { Propagation } from "@/components/sections/Propagation/Propagation";
import { RCAQuality } from "@/components/sections/RCAQuality/RCAQuality";
import { AuditLog } from "@/components/sections/AuditLog/AuditLog";

const SECTION_BY_TAB = {
  overview: Overview,
  triage: Triage,
  search: SemanticSearch,
  batch: GoldenBatch,
  propagation: Propagation,
  rca: RCAQuality,
  audit: AuditLog,
} as const;

export default function App() {
  const activeTab = useUiStore((s) => s.activeTab);
  const ActiveSection = SECTION_BY_TAB[activeTab];

  return (
    <MainLayout>
      <TransitionGroup>
        <PageTransition pageKey={activeTab}>
          <ActiveSection />
        </PageTransition>
      </TransitionGroup>
    </MainLayout>
  );
}
