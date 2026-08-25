import { useMemo } from "react";
import { useEventStore } from "@/stores/eventStore";
import { buildCorpus } from "@/services/ai/tfidf";
import { buildEventCorpusTexts } from "@/services/ai/similarity";

// Central place that turns the raw event list into the TF-IDF corpus every
// AI-flavored feature (Triage, Search, Propagation) reads from. Recomputes
// automatically whenever an event is added, edited, or closed.
export function useEvents() {
  const events = useEventStore((s) => s.events);
  const addEvent = useEventStore((s) => s.addEvent);

  const corpusTexts = useMemo(() => buildEventCorpusTexts(events), [events]);
  const { vectors: corpusVectors, idf: corpusIdf } = useMemo(
    () => buildCorpus(corpusTexts),
    [corpusTexts]
  );

  const avgConfidence = useMemo(() => {
    const withConf = events.filter((e) => typeof e.aiConfidence === "number");
    if (!withConf.length) return 0;
    return withConf.reduce((s, e) => s + e.aiConfidence, 0) / withConf.length;
  }, [events]);

  return { events, addEvent, corpusTexts, corpusVectors, corpusIdf, avgConfidence };
}
