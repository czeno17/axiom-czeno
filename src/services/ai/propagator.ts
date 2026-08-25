// Scans other product lines for suppliers, materials, and categories shared
// with a closed CAPA, and scores the likelihood the same failure recurs there.

import type { PropagationCandidate, QualityEvent } from "@/types";
import { PRODUCT_LINES } from "@/services/data/constants";
import { type SparseVector, cosineSim } from "./tfidf";

export function computePropagationCandidates(
  selected: QualityEvent,
  events: QualityEvent[],
  corpusVectors: SparseVector[]
): PropagationCandidate[] {
  const selectedIdx = events.findIndex((e) => e.id === selected.id);
  const qVec = corpusVectors[selectedIdx];
  const others = events.filter((e) => e.id !== selected.id && e.productLine !== selected.productLine);

  const byLine: Record<string, PropagationCandidate> = {};

  others.forEach((e) => {
    const i = events.findIndex((x) => x.id === e.id);
    const textScore = cosineSim(qVec, corpusVectors[i]) * 15;
    const supplierScore = e.supplier && e.supplier === selected.supplier ? 40 : 0;
    const materialScore =
      e.materialLot &&
      selected.materialLot &&
      e.materialLot.split(/[\s/]/)[0].slice(0, 2) === selected.materialLot.split(/[\s/]/)[0].slice(0, 2) &&
      e.supplier === selected.supplier
        ? 25
        : 0;
    const categoryScore = e.category === selected.category ? 20 : 0;
    const total = Math.min(Math.round(supplierScore + materialScore + categoryScore + textScore), 97);
    if (!byLine[e.productLine] || byLine[e.productLine].total < total) {
      byLine[e.productLine] = { line: e.productLine, evidence: e, total };
    }
  });

  PRODUCT_LINES.forEach((line) => {
    if (line === selected.productLine) return;
    if (!byLine[line]) {
      const sharedSupplier = events.some((e) => e.productLine === line && e.supplier === selected.supplier);
      if (sharedSupplier) byLine[line] = { line, evidence: null, total: 45 };
    }
  });

  return Object.values(byLine).sort((a, b) => b.total - a.total);
}
