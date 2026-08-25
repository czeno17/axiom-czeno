// src/services/ai/capaPropagation.ts

import { SEED_EVENTS } from "@/services/data/seedData";
import { RCALearningEngine } from "./rcaLearningEngine";

export interface PropagationCandidate {
  targetLine: string;
  probability: number;
  reason: string;
  similarEventId: string;
  recommendation: string;
}

export class CAPAPropagation {
  // When a CAPA is closed, find where else it applies
  static findPropagationCandidates(capaId: string): PropagationCandidate[] {
    const capa = SEED_EVENTS.find((e) => e.id === capaId);
    if (!capa || capa.type !== "CAPA") return [];

    const candidates: PropagationCandidate[] = [];
    const lines = ["Line A", "Line B", "Line C", "Line D"];

    // Get patterns from the closed CAPA
    const patterns = RCALearningEngine.findMatchingPatterns(
      `${capa.title} ${capa.description} ${capa.rootCauseDescription || ""}`
    );

    lines.forEach((line) => {
      if (line === capa.line) return; // Skip source line

      // Check if this line has similar issues
      const lineEvents = SEED_EVENTS.filter((e) => e.line === line);
      const similarEvents = lineEvents.filter((e) => {
        const text = `${e.title} ${e.description} ${e.rootCauseDescription || ""}`;
        return patterns.some((p) => text.toLowerCase().includes(p.issuePattern.toLowerCase()));
      });

      if (similarEvents.length > 0) {
        const probability = Math.min(
          (similarEvents.length / 10) * 100 + // Frequency factor
            (patterns.length / 5) * 20, // Pattern match factor
          95
        );

        candidates.push({
          targetLine: line,
          probability: Math.round(probability),
          reason: `${similarEvents.length} similar quality events found on ${line}`,
          similarEventId: similarEvents[0].id,
          recommendation: `Consider applying the CAPA solution to ${line}: ${capa.resolutionDetails || "Implement corrective action"}`,
        });
      }
    });

    return candidates.sort((a, b) => b.probability - a.probability);
  }

  // Convert propagation recommendation to Preventive Action
  static convertToPreventiveAction(candidate: PropagationCandidate): (typeof SEED_EVENTS)[0] {
    return {
      id: `CAPA-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
      title: `Preventive Action: ${candidate.reason}`,
      description: candidate.recommendation,
      category: "Preventive",
      severity: "Medium",
      assignee: "Process-Owner-1",
      line: candidate.targetLine,
      productLine: `Line ${candidate.targetLine}`,
      shift: "Day",
      supplier: null,
      status: "Open",
      created: new Date().toISOString().split("T")[0],
      resolved: null,
      type: "CAPA",
      source: "Propagation",
      priority: 2,
      rootCauseDescription: `Based on pattern from ${candidate.similarEventId}`,
      resolutionDetails: null,
      effectivenessVerification: null,
      lessonsLearned: null,
      closedBy: null,
      closedDate: null,
    };
  }
}
