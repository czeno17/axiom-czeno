// src/components/sections/CAPA/CAPAList.tsx

import { useState } from "react";
import { Search, ChevronRight, PlayCircle, CheckCircle, RotateCcw, PlusCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useEventStore } from "@/stores/eventStore";
import { useAuditStore } from "@/stores/auditStore";
import { CAPAStatusBadge } from "./CAPAStatusBadge";

interface CAPAListProps {
  onSelect: (capa: any) => void;
}

export function CAPAList({ onSelect }: CAPAListProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { events, updateEventStatus, closeCAPA, reopenCAPA, startCAPA, addRootCause } =
    useEventStore();
  const { logAudit } = useAuditStore();

  const capas = events
    .filter((e) => e.type === "CAPA")
    .filter((e) => {
      if (filter === "all") return true;
      return e.status === filter;
    })
    .filter((e) => {
      if (!search) return true;
      const text = `${e.title} ${e.description} ${e.id}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });

  const handleStartCAPA = (e: React.MouseEvent, capa: any) => {
    e.stopPropagation();
    if (confirm(`Start CAPA ${capa.id}? This will change status to 'In Progress'.`)) {
      startCAPA(capa.id);
      logAudit({
        actor: "Current User",
        action: "Started",
        eventId: capa.id,
        field: "status",
        before: "Open",
        after: "In Progress",
        reason: "CAPA investigation started",
      });
    }
  };

  const handleCloseCAPA = (e: React.MouseEvent, capa: any) => {
    e.stopPropagation();
    if (!capa.rootCauseDescription) {
      alert(
        "⚠️ Please add a root cause before closing this CAPA.\n\nClick 'Add RCA' button or open the CAPA detail to add RCA."
      );
      return;
    }
    if (confirm(`Close CAPA ${capa.id}? This will mark it as completed.`)) {
      closeCAPA(capa.id, "Current User");
      logAudit({
        actor: "Current User",
        action: "Closed",
        eventId: capa.id,
        field: "status",
        before: capa.status,
        after: "Closed",
        reason: "CAPA completed and verified",
      });
    }
  };

  const handleReopenCAPA = (e: React.MouseEvent, capa: any) => {
    e.stopPropagation();
    if (confirm(`Reopen CAPA ${capa.id}?`)) {
      reopenCAPA(capa.id);
      logAudit({
        actor: "Current User",
        action: "Reopened",
        eventId: capa.id,
        field: "status",
        before: "Closed",
        after: "In Progress",
        reason: "CAPA reopened for additional work",
      });
    }
  };

  const handleAddRCA = (e: React.MouseEvent, capa: any) => {
    e.stopPropagation();
    const rcaText = prompt("Enter the root cause for this CAPA:", capa.rootCauseDescription || "");
    if (rcaText && rcaText.trim()) {
      addRootCause(capa.id, rcaText.trim());
      logAudit({
        actor: "Current User",
        action: "Edited",
        eventId: capa.id,
        field: "rootCauseDescription",
        before: capa.rootCauseDescription || "Not specified",
        after: rcaText.trim(),
        reason: "Root cause added",
      });
      alert("✅ Root cause saved successfully!");
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            className="pl-9"
            placeholder="Search CAPAs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 border rounded-lg bg-white text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="space-y-3">
        {capas.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-slate-500">No CAPAs found.</p>
          </Card>
        ) : (
          capas.map((capa) => (
            <Card
              key={capa.id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onSelect(capa)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <CAPAStatusBadge status={capa.status} />
                    <span className="text-xs text-slate-400">{capa.id}</span>
                    <Badge
                      className={
                        capa.severity === "Critical"
                          ? "bg-red-100 text-red-800"
                          : capa.severity === "Major"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                      }
                    >
                      {capa.severity}
                    </Badge>
                  </div>
                  <h3 className="font-medium mt-1">{capa.title}</h3>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{capa.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 flex-wrap">
                    <span>Line: {capa.line}</span>
                    <span>Assignee: {capa.assignee}</span>
                    <span>Created: {capa.created}</span>
                    {capa.rootCauseDescription && (
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        ✅ RCA:{" "}
                        {capa.rootCauseDescription.length > 50
                          ? capa.rootCauseDescription.slice(0, 50) + "..."
                          : capa.rootCauseDescription}
                      </Badge>
                    )}
                    {capa.closedDate && <span>Closed: {capa.closedDate}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {/* Add RCA Button - shown when no RCA and not closed */}
                  {!capa.rootCauseDescription && capa.status !== "Closed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500 text-amber-700 hover:bg-amber-50"
                      onClick={(e) => handleAddRCA(e, capa)}
                    >
                      <PlusCircle className="w-3.5 h-3.5 mr-1" />
                      Add RCA
                    </Button>
                  )}
                  {/* Status Action Buttons */}
                  {capa.status === "Open" && (
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={(e) => handleStartCAPA(e, capa)}
                    >
                      <PlayCircle className="w-3.5 h-3.5 mr-1" />
                      Start
                    </Button>
                  )}
                  {capa.status === "In Progress" && (
                    <Button
                      size="sm"
                      className={
                        capa.rootCauseDescription
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "bg-slate-400 cursor-not-allowed"
                      }
                      onClick={(e) => handleCloseCAPA(e, capa)}
                      title={!capa.rootCauseDescription ? "Add RCA first" : "Close CAPA"}
                    >
                      <CheckCircle className="w-3.5 h-3.5 mr-1" />
                      Close
                    </Button>
                  )}
                  {capa.status === "Closed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500 text-amber-700 hover:bg-amber-50"
                      onClick={(e) => handleReopenCAPA(e, capa)}
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" />
                      Reopen
                    </Button>
                  )}
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
