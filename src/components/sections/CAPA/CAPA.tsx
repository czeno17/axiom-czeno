// src/components/sections/CAPA/CAPA.tsx

import { useState } from "react";
import { Activity, Plus } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CAPAList } from "./CAPAList";
import { CAPADetail } from "./CAPADetail";
import { CAPACreate } from "./CAPACreate";
import { useEventStore } from "@/stores/eventStore";

export function CAPA() {
  const [selectedCAPA, setSelectedCAPA] = useState<any>(null);
  const [showCreate, setShowCreate] = useState(false);
  const { events } = useEventStore();

  const capas = events.filter((e) => e.type === "CAPA");

  return (
    <div>
      <SectionHeader
        icon={Activity}
        title="CAPA Management"
        subtitle="Formal corrective and preventive action workflow with intelligent RCA assistance"
      >
        <Button onClick={() => setShowCreate(true)} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          New CAPA
        </Button>
      </SectionHeader>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-indigo-600">
            {capas.filter((c) => c.status === "Open").length}
          </p>
          <p className="text-sm text-slate-500">Open CAPAs</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">
            {capas.filter((c) => c.status === "In Progress").length}
          </p>
          <p className="text-sm text-slate-500">In Progress</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">
            {capas.filter((c) => c.status === "Closed").length}
          </p>
          <p className="text-sm text-slate-500">Closed CAPAs</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-slate-600">{capas.length}</p>
          <p className="text-sm text-slate-500">Total CAPAs</p>
        </Card>
      </div>

      {showCreate ? (
        <CAPACreate onClose={() => setShowCreate(false)} />
      ) : selectedCAPA ? (
        <CAPADetail capa={selectedCAPA} onBack={() => setSelectedCAPA(null)} />
      ) : (
        <CAPAList onSelect={setSelectedCAPA} />
      )}
    </div>
  );
}
