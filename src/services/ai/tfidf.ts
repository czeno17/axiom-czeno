// Real, deterministic TF-IDF + cosine similarity — runs entirely client-side.
// No external embedding API is called; this is the "vector engine" for Czeno.

export type SparseVector = Record<string, number>;

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "with", "was",
  "were", "is", "are", "at", "by", "this", "that", "from", "it", "as", "be",
  "has", "have", "had", "not", "during", "after", "before", "due",
]);

export function tokenize(text: string | undefined | null): string[] {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

export interface Corpus {
  vectors: SparseVector[];
  idf: Record<string, number>;
}

export function buildCorpus(docs: string[]): Corpus {
  const tokDocs = docs.map(tokenize);
  const df: Record<string, number> = {};
  tokDocs.forEach((toks) => new Set(toks).forEach((t) => (df[t] = (df[t] || 0) + 1)));
  const N = docs.length;
  const idf: Record<string, number> = {};
  Object.keys(df).forEach((t) => (idf[t] = Math.log((N + 1) / (df[t] + 1)) + 1));

  const vectors = tokDocs.map((toks) => {
    const tf: Record<string, number> = {};
    toks.forEach((t) => (tf[t] = (tf[t] || 0) + 1));
    const vec: SparseVector = {};
    Object.keys(tf).forEach((t) => (vec[t] = (tf[t] / Math.max(toks.length, 1)) * (idf[t] || 0)));
    return vec;
  });

  return { vectors, idf };
}

export function vectorizeQuery(text: string, idf: Record<string, number>): SparseVector {
  const toks = tokenize(text);
  const tf: Record<string, number> = {};
  toks.forEach((t) => (tf[t] = (tf[t] || 0) + 1));
  const vec: SparseVector = {};
  Object.keys(tf).forEach((t) => (vec[t] = (tf[t] / Math.max(toks.length, 1)) * (idf[t] || 0)));
  return vec;
}

export function cosineSim(a: SparseVector, b: SparseVector): number {
  let dot = 0, na = 0, nb = 0;
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  keys.forEach((k) => {
    const av = a[k] || 0, bv = b[k] || 0;
    dot += av * bv; na += av * av; nb += bv * bv;
  });
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}
