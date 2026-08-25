// src/services/ai/qualityIntelligence.ts

export class QualityIntelligence {
  // Learn from completed CAPAs to improve triage
  static improveTriageWithCAPALearning(description: string): TriageResult {
    // Get all closed CAPAs
    const closedCAPAs = SEED_EVENTS.filter(
      (e) => e.status === "Closed" && e.type === "CAPA" && e.rootCauseDescription
    );

    // Find which CAPA patterns match this issue
    const matchingCAPAs = closedCAPAs.filter((capa) => {
      const searchText = `${capa.title} ${capa.description} ${capa.rootCauseDescription}`;
      return description
        .toLowerCase()
        .split(" ")
        .some((word) => searchText.toLowerCase().includes(word));
    });

    // Use the CAPA learnings to improve triage
    return {
      // Better categorization based on past CAPAs
      category: this.inferCategoryFromCAPAs(matchingCAPAs),

      // Better severity based on past outcomes
      severity: this.inferSeverityFromCAPAs(matchingCAPAs),

      // Better assignee based on past success
      suggestedAssignee: this.inferAssigneeFromCAPAs(matchingCAPAs),

      // More accurate root cause suggestion
      suggestedRootCause: this.summarizeRootCauses(matchingCAPAs),

      // Show actual CAPA solutions from the past
      similarEvents: matchingCAPAs.map((capa) => ({
        id: capa.id,
        title: capa.title,
        rootCause: capa.rootCauseDescription,
        solution: capa.resolutionDetails,
        effectiveness: capa.effectivenessVerification,
        similarity: this.calculateSimilarity(description, capa.description),
      })),

      confidence: this.calculateConfidence(matchingCAPAs),
    };
  }
}
