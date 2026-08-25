// Wraps the TF-IDF engine into the higher-level "find similar historical
// events" operation used by Triage's Similarity Snapshot and by Search.

import type { QualityEvent, SimilarityMatch } from "@/types";
import { type SparseVector, cosineSim, vectorizeQuery } from "./tfidf";

export function findSimilarEvents(
  events: QualityEvent[],
  corpusVectors: SparseVector[],
  corpusIdf: Record<string, number>,
  queryText: string,
  topN = 3
): SimilarityMatch[] {
  const qVec = vectorizeQuery(queryText, corpusIdf);
  return events
    .map((event, i) => ({ event, score: cosineSim(qVec, corpusVectors[i]) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

export function buildEventCorpusTexts(events: QualityEvent[]): string[] {
  return events.map((e) =>
    [e.title, e.description, e.rootCauseDescription, e.correctiveAction, e.preventiveAction]
      .filter(Boolean)
      .join(" ")
  );
}
