import type { BatchPoint } from "@/types";
import { NOW, PARAMS, PRODUCT_LINES } from "./constants";

export function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function daysAgoIso(n: number): string {
  return new Date(NOW.getTime() - n * 86400000).toISOString();
}

// Deterministic PRNG (mulberry32) so the Golden Batch demo data is stable
// across reloads without needing to persist it anywhere.
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function genBatchSeries(lineIndex: number): BatchPoint[] {
  const rnd = mulberry32(1000 + lineIndex * 77);
  const points: BatchPoint[] = [];
  for (let i = 0; i < 24; i++) {
    const row: BatchPoint = { hour: `T-${23 - i}h` };
    PARAMS.forEach((p) => {
      let noise = (rnd() - 0.5) * 2 * p.sigma * 0.8;
      // Story hook: Line A extrusion temp drifts upward in the last 6 points,
      // consistent with the Supplier A billet root-cause thread in the seed data.
      if (lineIndex === 0 && p.key === "extrusionTemp" && i >= 18) {
        noise += (i - 17) * 2.5;
      }
      row[p.key] = Math.round((p.mean + noise) * 10) / 10;
    });
    points.push(row);
  }
  return points;
}

export const BATCH_SERIES: BatchPoint[][] = PRODUCT_LINES.map((_, i) => genBatchSeries(i));
