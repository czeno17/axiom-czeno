import { useMemo, useState } from "react";
import { useEvents } from "./useEvents";
import { tokenize, vectorizeQuery, cosineSim } from "@/services/ai/tfidf";
import type { QualityEvent } from "@/types";

export interface SearchResult {
  event: QualityEvent;
  hybrid: number;
  keywordScore: number;
  vectorScore: number;
}

// Hybrid search: blends keyword overlap with TF-IDF cosine similarity.
// `weight` (0..1) controls how much the semantic score counts vs keyword.
export function useSearch() {
  const { events, corpusVectors, corpusIdf, corpusTexts } = useEvents();
  const [query, setQuery] = useState("");
  const [refine, setRefine] = useState("");
  const [weight, setWeight] = useState(0.5);

  const fullQuery = `${query} ${refine}`.trim();

  const results: SearchResult[] = useMemo(() => {
    if (!fullQuery) return [];
    const qTokens = new Set(tokenize(fullQuery));
    const qVec = vectorizeQuery(fullQuery, corpusIdf);
    return events
      .map((event, i) => {
        const docTokens = new Set(tokenize(corpusTexts[i]));
        const overlap = [...qTokens].filter((t) => docTokens.has(t)).length;
        const keywordScore = qTokens.size ? overlap / qTokens.size : 0;
        const vectorScore = cosineSim(qVec, corpusVectors[i]);
        const hybrid = weight * vectorScore + (1 - weight) * keywordScore;
        return { event, hybrid, keywordScore, vectorScore };
      })
      .filter((r) => r.hybrid > 0.02)
      .sort((a, b) => b.hybrid - a.hybrid)
      .slice(0, 8);
  }, [fullQuery, events, corpusVectors, corpusIdf, corpusTexts, weight]);

  return { query, setQuery, refine, setRefine, weight, setWeight, fullQuery, results, totalIndexed: events.length };
}
