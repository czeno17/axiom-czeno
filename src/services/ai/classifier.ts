// Rule-based heuristic classification. In production this call would be
// replaced by a structured-output request to an LLM (see README "Path to
// production"); the interface below is deliberately the same shape either way.

import type { AssigneeResult, ClassificationResult, QualityEvent, SeverityResult } from "@/types";
import { ENGINEERS } from "@/services/data/constants";

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Flatness: ["flatness", "warp", "bow", "warpage", "out of flat", "surface plane", "curvature", "base flatness"],
  "Surface Roughness": ["roughness", "ra", "finish", "scratch", "surface quality", "rough", "smooth"],
  "Hole Position/Tapping": ["hole position", "mounting hole", "tapping", "thread", "pitch", "positional tolerance", "cmm hole"],
  "Plating/Coating Quality": ["plating", "coating", "blister", "delamination", "adhesion", "nickel", "plating thickness", "oxidation"],
  "Material Composition": ["composition", "alloy", "silicon", "thermal conductivity", "xrf", "material cert", "contamina", "porosity"],
  "Thermal Performance": ["thermal", "tim", "void", "heat pipe", "temperature", "overheat", "junction temp", "cooling"],
};

const SEVERITY_KEYWORDS: Record<string, string[]> = {
  Critical: ["safety", "field failure", "customer complaint", "recall", "overheat", "server down", "shutdown", "line down"],
  Major: ["scrap", "rework", "repeat", "recurring", "multiple units", "batch", "100%", "quarantine"],
  Minor: ["cosmetic", "minor", "isolated", "single unit", "one-off", "non-critical"],
};

export function classifyCategory(text: string): ClassificationResult {
  const t = text.toLowerCase();
  let best: string | null = null;
  let bestScore = 0;
  Object.entries(CATEGORY_KEYWORDS).forEach(([cat, kws]) => {
    const score = kws.reduce((s, k) => s + (t.includes(k) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = cat;
    }
  });
  const confidence = best ? Math.min(0.58 + bestScore * 0.11, 0.97) : 0.42;
  return { category: best || "Thermal Performance", confidence };
}

export function classifySeverity(text: string): SeverityResult {
  const t = text.toLowerCase();
  let best: string | null = null;
  let bestScore = 0;
  Object.entries(SEVERITY_KEYWORDS).forEach(([sev, kws]) => {
    const score = kws.reduce((s, k) => s + (t.includes(k) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = sev;
    }
  });
  const confidence = best ? Math.min(0.55 + bestScore * 0.14, 0.95) : 0.5;
  return { severity: best || "Major", confidence };
}

export function suggestAssignee(
  events: QualityEvent[],
  category: string,
  productLine: string
): AssigneeResult {
  const matches = events.filter(
    (e) => e.category === category && e.productLine === productLine && e.assignedEngineer
  );
  const pool = matches.length
    ? matches
    : events.filter((e) => e.category === category && e.assignedEngineer);
  if (!pool.length) return { assignee: ENGINEERS[0], confidence: 0.4 };
  const counts: Record<string, number> = {};
  pool.forEach((e) => (counts[e.assignedEngineer] = (counts[e.assignedEngineer] || 0) + 1));
  const [name, count] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return { assignee: name, confidence: Math.min(0.55 + count * 0.1, 0.95) };
}
