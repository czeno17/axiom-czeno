// src/components/sections/CAPA/CAPADetail.tsx

import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Calendar,
  PlayCircle,
  RotateCcw,
  FileCheck,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { useEventStore } from "@/stores/eventStore";
import { useAuditStore } from "@/stores/auditStore";
import { CAPAStatusBadge } from "./CAPAStatusBadge";

interface CAPADetailProps {
  capa: any;
  onBack: () => void;
}

export function CAPADetail({ capa, onBack }: CAPADetailProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "rca" | "actions" | "verification" | "history"
  >("overview");
  const [rootCause, setRootCause] = useState(capa.rootCauseDescription || "");
  const [resolution, setResolution] = useState(capa.resolutionDetails || "");
  const [lessons, setLessons] = useState(capa.lessonsLearned || "");
  const [isSaving, setIsSaving] = useState(false);

  const {
    updateEventStatus,
    closeCAPA,
    reopenCAPA,
    startCAPA,
    addRootCause,
    addResolution,
    addLessonsLearned,
  } = useEventStore();
  const { logAudit } = useAuditStore();

  const handleStartCAPA = () => {
    if (confirm("Start this CAPA? This will change status to 'In Progress'.")) {
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
      onBack(); // Refresh the list
    }
  };

  const handleCloseCAPA = () => {
    if (!capa.rootCauseDescription) {
      alert("Please add a root cause before closing this CAPA.");
      setActiveTab("rca");
      return;
    }
    if (confirm("Close this CAPA? This will mark it as completed.")) {
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
      onBack(); // Refresh the list
    }
  };

  const handleReopenCAPA = () => {
    if (confirm("Reopen this CAPA?")) {
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
      onBack(); // Refresh the list
    }
  };

  const handleSaveRCA = () => {
    setIsSaving(true);
    if (rootCause) {
      addRootCause(capa.id, rootCause);
      logAudit({
        actor: "Current User",
        action: "Edited",
        eventId: capa.id,
        field: "rootCauseDescription",
        before: capa.rootCauseDescription || "Not specified",
        after: rootCause,
        reason: "Root cause updated",
      });
    }
    setIsSaving(false);
    alert("Root cause saved successfully!");
  };

  const handleSaveResolution = () => {
    setIsSaving(true);
    if (resolution) {
      addResolution(capa.id, resolution);
      logAudit({
        actor: "Current User",
        action: "Edited",
        eventId: capa.id,
        field: "resolutionDetails",
        before: capa.resolutionDetails || "Not specified",
        after: resolution,
        reason: "Resolution updated",
      });
    }
    if (lessons) {
      addLessonsLearned(capa.id, lessons);
      logAudit({
        actor: "Current User",
        action: "Edited",
        eventId: capa.id,
        field: "lessonsLearned",
        before: capa.lessonsLearned || "Not specified",
        after: lessons,
        reason: "Lessons learned updated",
      });
    }
    setIsSaving(false);
    alert("Actions saved successfully!");
  };

  if (!capa) {
    return (
      <Card className="p-8 text-center">
        <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500">No CAPA selected.</p>
        <Button variant="outline" onClick={onBack} className="mt-4">
          Go Back
        </Button>
      </Card>
    );
  }

  const statusActions = {
    Open: {
      label: "Start CAPA",
      icon: <PlayCircle className="w-4 h-4 mr-2" />,
      action: handleStartCAPA,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    "In Progress": {
      label: "Close CAPA",
      icon: <FileCheck className="w-4 h-4 mr-2" />,
      action: handleCloseCAPA,
      color: "bg-emerald-600 hover:bg-emerald-700",
    },
    Closed: {
      label: "Reopen CAPA",
      icon: <RotateCcw className="w-4 h-4 mr-2" />,
      action: handleReopenCAPA,
      color: "bg-amber-600 hover:bg-amber-700",
    },
  };

  const currentAction = statusActions[capa.status as keyof typeof statusActions];

  return (
    <div>
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-xl font-bold">{capa.id}</h2>
        <CAPAStatusBadge status={capa.status} />
        {currentAction && (
          <Button className={currentAction.color} onClick={currentAction.action}>
            {currentAction.icon}
            {currentAction.label}
          </Button>
        )}
      </div>

      {/* Status Info Bar */}
      <div className="flex gap-4 mb-4 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Created: {capa.created}</span>
        </div>
        {capa.closedDate && (
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Closed: {capa.closedDate}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-slate-400" />
          <span>Assignee: {capa.assignee}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Line: {capa.line}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b mb-4">
        {["overview", "rca", "actions", "verification", "history"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${
              activeTab === tab
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-slate-600">{capa.description}</p>
            {capa.rootCauseDescription && (
              <>
                <h3 className="font-semibold mt-4 mb-2">Root Cause</h3>
                <p className="text-slate-600">{capa.rootCauseDescription}</p>
              </>
            )}
            {capa.resolutionDetails && (
              <>
                <h3 className="font-semibold mt-4 mb-2">Resolution</h3>
                <p className="text-slate-600">{capa.resolutionDetails}</p>
              </>
            )}
            {capa.lessonsLearned && (
              <>
                <h3 className="font-semibold mt-4 mb-2">Lessons Learned</h3>
                <p className="text-slate-600">{capa.lessonsLearned}</p>
              </>
            )}
          </Card>

          {/* Status Info */}
          <Card className="p-4 bg-slate-50">
            <h3 className="font-semibold mb-2">Status Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500">Current Status:</span>
                <Badge
                  className={
                    capa.status === "Open"
                      ? "bg-amber-100 text-amber-800"
                      : capa.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-emerald-100 text-emerald-800"
                  }
                >
                  {capa.status}
                </Badge>
              </div>
              <div>
                <span className="text-slate-500">Type:</span>
                <span className="ml-2">{capa.type}</span>
              </div>
              <div>
                <span className="text-slate-500">Severity:</span>
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
              <div>
                <span className="text-slate-500">Category:</span>
                <span className="ml-2">{capa.category}</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* RCA Tab */}
      {activeTab === "rca" && (
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Root Cause Analysis</h3>
          <p className="text-sm text-slate-600 mb-4">
            Document the root cause of this issue using 5-Why or Fishbone analysis.
          </p>
          <textarea
            className="w-full p-3 border rounded-lg min-h-[150px] text-sm"
            placeholder="Describe the root cause in detail..."
            value={rootCause}
            onChange={(e) => setRootCause(e.target.value)}
          />
          <div className="flex gap-2 mt-3">
            <Button
              onClick={handleSaveRCA}
              className="bg-indigo-600 hover:bg-indigo-700"
              disabled={isSaving || !rootCause}
            >
              {isSaving ? "Saving..." : "Save Root Cause"}
            </Button>
            {capa.rootCauseDescription && (
              <Button variant="outline" onClick={() => setRootCause(capa.rootCauseDescription)}>
                Reset
              </Button>
            )}
          </div>
          {capa.rootCauseDescription && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-xs text-emerald-700">
                ✅ RCA completed on {capa.closedDate || capa.created}
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Actions Tab */}
      {activeTab === "actions" && (
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Corrective Actions</h3>
            <p className="text-sm text-slate-600 mb-3">
              What actions are being taken to fix the immediate issue?
            </p>
            <textarea
              className="w-full p-3 border rounded-lg min-h-[100px] text-sm"
              placeholder="Describe corrective actions..."
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
            />
            <Button
              onClick={handleSaveResolution}
              className="mt-3 bg-indigo-600 hover:bg-indigo-700"
              disabled={isSaving || !resolution}
            >
              {isSaving ? "Saving..." : "Save Actions"}
            </Button>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Preventive Actions</h3>
            <p className="text-sm text-slate-600 mb-3">
              What will be done to prevent this from happening again?
            </p>
            <textarea
              className="w-full p-3 border rounded-lg min-h-[100px] text-sm"
              placeholder="Describe preventive actions and lessons learned..."
              value={lessons}
              onChange={(e) => setLessons(e.target.value)}
            />
            <Button
              onClick={handleSaveResolution}
              className="mt-3 bg-indigo-600 hover:bg-indigo-700"
              disabled={isSaving || !lessons}
            >
              {isSaving ? "Saving..." : "Save Lessons"}
            </Button>
          </Card>
        </div>
      )}

      {/* Verification Tab */}
      {activeTab === "verification" && (
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Effectiveness Verification</h3>
          {capa.status === "Closed" ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">CAPA Verified - Effective</span>
              </div>
              <p className="text-sm text-emerald-600 mt-2">
                {capa.effectivenessVerification || "This CAPA has been verified as effective."}
              </p>
              <p className="text-xs text-emerald-500 mt-1">
                Closed on {capa.closedDate} by {capa.closedBy || "System"}
              </p>
            </div>
          ) : capa.status === "In Progress" ? (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700">
                <Clock className="w-5 h-5" />
                <span className="font-medium">CAPA In Progress</span>
              </div>
              <p className="text-sm text-blue-600 mt-2">
                Verification will happen after all actions are completed and CAPA is closed.
              </p>
            </div>
          ) : (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2 text-amber-700">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">CAPA Not Yet Verified</span>
              </div>
              <p className="text-sm text-amber-600 mt-2">
                Complete the RCA and actions, then close the CAPA for verification.
              </p>
            </div>
          )}
        </Card>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Audit Trail</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Created</p>
                <p className="text-xs text-slate-500">
                  {capa.created} by {capa.assignee}
                </p>
              </div>
            </div>
            {capa.startedAt && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <PlayCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Started</p>
                  <p className="text-xs text-slate-500">
                    {capa.startedAt} by {capa.assignee}
                  </p>
                </div>
              </div>
            )}
            {capa.closedDate && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Closed</p>
                  <p className="text-xs text-slate-500">
                    {capa.closedDate} by {capa.closedBy || "System"}
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Current Status</p>
                <p className="text-xs text-slate-500">{capa.status}</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
