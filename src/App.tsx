// src/App.tsx

import { useActiveTabStore } from "@/stores/activeTabStore";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

// DIRECT IMPORTS - NO index.tsx!
import { Overview } from "@/components/sections/Overview/Overview";
import { GoldenBatch } from "@/components/sections/GoldenBatch/GoldenBatch";
import { Triage } from "@/components/sections/Triage/Triage";
import { CAPA } from "@/components/sections/CAPA/CAPA";
import { Search } from "@/components/sections/Search/Search";
import { Propagation } from "@/components/sections/Propagation/Propagation";
import { RCAQuality } from "@/components/sections/RCAQuality/RCAQuality";
import { AuditLog } from "@/components/sections/AuditLog/AuditLog";

function App() {
  const { activeTab } = useActiveTabStore();

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "goldenBatch":
        return <GoldenBatch />;
      case "triage":
        return <Triage />;
      case "capa":
        return <CAPA />;
      case "search":
        return <Search />;
      case "propagation":
        return <Propagation />;
      case "rcaQuality":
        return <RCAQuality />;
      case "auditLog":
        return <AuditLog />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
}

export default App;
