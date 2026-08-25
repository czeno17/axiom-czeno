import { describe, expect, it } from "vitest";
import { buildCorpus, cosineSim, tokenize, vectorizeQuery } from "@/services/ai/tfidf";

describe("tfidf", () => {
  it("tokenizes and drops stopwords/short tokens", () => {
    expect(tokenize("The flatness of the base is out of spec")).toEqual(
      expect.arrayContaining(["flatness", "base", "spec"])
    );
  });

  it("scores an exact-topic query above an unrelated one", () => {
    const docs = [
      "Flatness deviation on heat sink base from Supplier A aluminum billet",
      "Plating thickness below specification on heat sink fins",
    ];
    const { vectors, idf } = buildCorpus(docs);
    const qVec = vectorizeQuery("flatness issue with aluminum billet", idf);
    const scoreFlatness = cosineSim(qVec, vectors[0]);
    const scorePlating = cosineSim(qVec, vectors[1]);
    expect(scoreFlatness).toBeGreaterThan(scorePlating);
  });
});
