// src/components/sections/CAPA/IntelligentTriage.tsx

import { useState } from "react";
import { Search, Sparkles, ThumbsUp, ThumbsDown, Edit2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useEventStore } from "@/stores/eventStore";
import { useAuditStore } from "@/stores/auditStore";

export function IntelligentTriageComponent() {
  const [description, setDescription] = useState("");
  const [suggestion, setSuggestion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const { events, addEvent } = useEventStore();
  const { logAudit } = useAuditStore();

  // Get closed CAPAs for learning
  const closedCAPAs = events.filter((e) => e.status === "Closed" && e.type === "CAPA");

  const handleTriage = async () => {
    setIsLoading(true);
    try {
      // Simulate AI triage (in production, this would call an API)
      const result = {
        category: "Quality",
        severity: "Medium",
        assignee: "Process-Owner-1",
        confidence: 0.85,
        similarEvents: [
          {
            id: "NCR-2606-01",
            title: "Extrusion temperature deviation",
            rootCause: "Thermocouple calibration drift",
            solution: "Re-calibrated thermocouples",
            effectiveness: true,
          },
        ],
        suggestedRCA: "Based on similar cases, check calibration of measuring equipment.",
      };
      setSuggestion(result);
    } catch (error) {
      console.error("Triage failed:", error);
    }
    setIsLoading(false);
  };

  const handleAccept = () => {
    setAccepted(true);
    // Log acceptance to audit trail
    logAudit({
      actor: "Current User",
      action: "Accepted",
      eventId: "NCR-" + Date.now(),
      field: "triage",
      before: "AI suggestion",
      after: "Accepted",
      reason: "AI suggestion accepted",
    });
    console.log("AI suggestion accepted:", suggestion);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-600" />
          Intelligent CAPA Triage
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          AI-powered triage learns from {closedCAPAs.length} closed CAPAs.
        </p>

        <div className="flex gap-2">
          <textarea
            className="flex-1 p-3 border rounded-lg min-h-[100px]"
            placeholder="Describe the quality issue in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex gap-2 mt-3">
          <Button
            onClick={handleTriage}
            disabled={!description || isLoading}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Search className="w-4 h-4 mr-2" />
            {isLoading ? "Analyzing..." : "Triage Issue"}
          </Button>
        </div>

        {suggestion && !accepted && (
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold mb-3">AI Suggestion</h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-xs text-slate-500">Category</span>
                <p className="font-medium">{suggestion.category}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-xs text-slate-500">Severity</span>
                <Badge
                  className={
                    suggestion.severity === "Critical"
                      ? "bg-red-100 text-red-800"
                      : suggestion.severity === "Major"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-blue-100 text-blue-800"
                  }
                >
                  {suggestion.severity}
                </Badge>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-xs text-slate-500">Assignee</span>
              <p className="font-medium">{suggestion.assignee}</p>
            </div>

            <div className="mb-4">
              <span className="text-xs text-slate-500">Confidence</span>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-200 rounded-full">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${suggestion.confidence * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {Math.round(suggestion.confidence * 100)}%
                </span>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-xs text-slate-500">Similar Historical Events</span>
              {suggestion.similarEvents && suggestion.similarEvents.length > 0 ? (
                suggestion.similarEvents.map((event: any, index: number) => (
                  <div key={index} className="mt-1 p-2 bg-slate-50 rounded-lg text-sm">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-slate-600">Root cause: {event.rootCause}</p>
                    <p className="text-slate-600">Solution: {event.solution}</p>
                    <Badge
                      className={
                        event.effectiveness
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }
                    >
                      {event.effectiveness ? "✓ Effective" : "⚠️ Needs Review"}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400">No similar events found.</p>
              )}
            </div>

            <div className="mb-4">
              <span className="text-xs text-slate-500">Suggested Root Cause</span>
              <p className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-sm">
                {suggestion.suggestedRCA}
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <Button onClick={handleAccept} className="bg-emerald-600 hover:bg-emerald-700">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Accept & Create CAPA
              </Button>
              <Button
                variant="outline"
                className="border-amber-500 text-amber-700 hover:bg-amber-50"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" className="border-red-500 text-red-700 hover:bg-red-50">
                <ThumbsDown className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>
          </div>
        )}

        {accepted && (
          <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-emerald-800 font-medium">✓ AI suggestion accepted</p>
            <p className="text-emerald-600 text-sm mt-1">
              CAPA has been created. The system will learn from this decision.
            </p>
          </div>
        )}
      </Card>

      <Card className="mt-4 p-4">
        <h3 className="font-semibold mb-2">RCA Knowledge Base</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-indigo-600">{closedCAPAs.length}</p>
            <p className="text-xs text-slate-500">Resolved CAPAs</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {events.filter((e) => e.type === "CAPA" && e.rootCauseDescription).length}
            </p>
            <p className="text-xs text-slate-500">With RCA</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-amber-600">
              {events.filter((e) => e.type === "CAPA" && e.status === "Open").length}
            </p>
            <p className="text-xs text-slate-500">Active CAPAs</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
