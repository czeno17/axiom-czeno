// src/services/ai/rcaLearningEngine.ts

import { SEED_EVENTS } from "@/services/data/seedData";

export interface RCAPattern {
  issuePattern: string;
  rootCausePattern: string;
  solutionPattern: string;
  effectivenessScore: number;
  frequency: number;
}

export class RCALearningEngine {
  // Build pattern database from closed CAPAs
  static buildPatternDatabase(): RCAPattern[] {
    const closedCAPAs = SEED_EVENTS.filter(
      (e) =>
        e.status === "Closed" && e.type === "CAPA" && e.rootCauseDescription && e.resolutionDetails
    );

    const patterns: Record<string, RCAPattern> = {};

    closedCAPAs.forEach((event) => {
      // Extract key phrases from the issue
      const keywords = this.extractKeywords(event.description);
      const patternKey = keywords.join("|");

      if (!patterns[patternKey]) {
        patterns[patternKey] = {
          issuePattern: keywords.join(" "),
          rootCausePattern: event.rootCauseDescription || "",
          solutionPattern: event.resolutionDetails || "",
          effectivenessScore: event.effectivenessVerification?.includes("Effective") ? 1 : 0.5,
          frequency: 1,
        };
      } else {
        patterns[patternKey].frequency++;
        // Update with new learnings
        if (event.effectivenessVerification?.includes("Effective")) {
          patterns[patternKey].effectivenessScore =
            (patterns[patternKey].effectivenessScore + 1) / 2;
        }
      }
    });

    return Object.values(patterns);
  }

  // Extract key phrases from text
  static extractKeywords(text: string): string[] {
    const stopWords = ["the", "a", "an", "of", "for", "in", "on", "at", "to", "with"];
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(" ")
      .filter((word) => word.length > 3 && !stopWords.includes(word))
      .slice(0, 5);
  }

  // Find matching patterns for a new issue
  static findMatchingPatterns(issue: string): RCAPattern[] {
    const patterns = this.buildPatternDatabase();
    const issueKeywords = this.extractKeywords(issue);

    return patterns
      .filter((pattern) => {
        const patternKeywords = this.extractKeywords(pattern.issuePattern);
        const matchCount = patternKeywords.filter((kw) =>
          issueKeywords.some((ik) => ik.includes(kw) || kw.includes(ik))
        ).length;
        return matchCount >= 2; // At least 2 keyword matches
      })
      .sort((a, b) => {
        // Prioritize by effectiveness and frequency
        const scoreA = a.effectivenessScore * a.frequency;
        const scoreB = b.effectivenessScore * b.frequency;
        return scoreB - scoreA;
      });
  }

  // Generate intelligent suggestions with confidence
  static generateSuggestion(issue: string): {
    suggestedRootCause: string;
    suggestedSolution: string;
    confidence: number;
    similarCases: string[];
  } {
    const matches = this.findMatchingPatterns(issue);

    if (matches.length === 0) {
      return {
        suggestedRootCause: "No similar patterns found. Recommend RCA investigation.",
        suggestedSolution: "Conduct detailed root cause analysis.",
        confidence: 0,
        similarCases: [],
      };
    }

    const bestMatch = matches[0];
    return {
      suggestedRootCause: bestMatch.rootCausePattern,
      suggestedSolution: bestMatch.solutionPattern,
      confidence: bestMatch.effectivenessScore * (bestMatch.frequency / 10),
      similarCases: [bestMatch.issuePattern],
    };
  }

  // Track effectiveness of recommendations over time
  static trackEffectiveness(capaId: string, effective: boolean) {
    // In production, update the database
    console.log(`CAPA ${capaId} effectiveness tracked: ${effective}`);
  }

  // Generate learning report
  static generateLearningReport(): {
    totalPatterns: number;
    mostCommonRootCauses: string[];
    mostEffectiveSolutions: string[];
  } {
    const patterns = this.buildPatternDatabase();

    const rootCauseFreq: Record<string, number> = {};
    const solutionEffectiveness: Record<string, number> = {};

    patterns.forEach((p) => {
      rootCauseFreq[p.rootCausePattern] = (rootCauseFreq[p.rootCausePattern] || 0) + p.frequency;
      solutionEffectiveness[p.solutionPattern] =
        (solutionEffectiveness[p.solutionPattern] || 0) + p.effectivenessScore;
    });

    return {
      totalPatterns: patterns.length,
      mostCommonRootCauses: Object.entries(rootCauseFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([key]) => key),
      mostEffectiveSolutions: Object.entries(solutionEffectiveness)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([key]) => key),
    };
  }
}
