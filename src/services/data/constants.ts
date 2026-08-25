import type { BatchParamDef } from "@/types";

export const APP_NAME = "Czeno";
export const ORG_NAME = "Furukawa Thermal Laguna";
export const APP_TAGLINE = "Quality Intelligence for heat sink manufacturing";

// Reference "now" the whole demo is pinned to, so seeded ages (days-open,
// overdue RCAs, etc.) are stable across sessions.
export const NOW = new Date("2026-08-14T09:00:00Z");

export const PRODUCT_LINES = [
  "Line A — Heat Sink Extrusion",
  "Line B — Fin Assembly & Bonding",
  "Line C — Surface Treatment (Plating/Coating)",
  "Line D — Final QA & Packing",
];

export const SUPPLIERS = [
  "Supplier A — Aluminum Billets",
  "Supplier B — Copper Base Plates",
  "Supplier C — Heat Pipes",
  "Supplier D — Thermal Interface Materials",
  "Supplier E — Plating Chemicals",
];

export const ENGINEERS = [
  "Process-Owner-1",
  "Process-Owner-2",
  "Process-Owner-3",
  "Process-Owner-4",
  "Process-Owner-5",
];

export const CATEGORIES = [
  "Flatness",
  "Surface Roughness",
  "Hole Position/Tapping",
  "Plating/Coating Quality",
  "Material Composition",
  "Thermal Performance",
];

export const SHIFTS = ["Day", "Night"] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  Flatness: "#4f46e5",
  "Surface Roughness": "#64748b",
  "Hole Position/Tapping": "#d97706",
  "Plating/Coating Quality": "#0ea5e9",
  "Material Composition": "#e11d48",
  "Thermal Performance": "#059669",
};

export const SEVERITY_BADGE: Record<string, string> = {
  Minor: "bg-emerald-100 text-emerald-800 border-emerald-300",
  Major: "bg-amber-100 text-amber-800 border-amber-300",
  Critical: "bg-rose-100 text-rose-800 border-rose-300",
};

export const STATUS_BADGE: Record<string, string> = {
  Open: "bg-slate-100 text-slate-700 border-slate-300",
  InReview: "bg-indigo-100 text-indigo-800 border-indigo-300",
  Closed: "bg-emerald-100 text-emerald-800 border-emerald-300",
  Archived: "bg-slate-100 text-slate-500 border-slate-300",
};

export const PARAMS: BatchParamDef[] = [
  { key: "extrusionTemp", label: "Extrusion Temp (C)", mean: 450, sigma: 8 },
  { key: "coolingRate", label: "Cooling Rate (C/min)", mean: 5, sigma: 0.8 },
  { key: "humidity", label: "Humidity (%RH)", mean: 45, sigma: 5 },
  { key: "platingCurrent", label: "Plating Current (A)", mean: 120, sigma: 4 },
];

export const RCA_TARGET_RATE = 80;
export const OVERDUE_DAYS_THRESHOLD = 7;
