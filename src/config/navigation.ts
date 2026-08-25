// src/config/navigation.ts

import {
  LayoutDashboard,
  Search,
  Activity,
  Share2,
  BarChart3,
  Clock,
  ClipboardList,
  Home,
  FileText,
  Sparkles,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    id: "triage",
    label: "CAPA Triage",
    icon: Search,
  },
  {
    id: "capa",
    label: "CAPA Management",
    icon: ClipboardList,
  },
  {
    id: "search",
    label: "Semantic Search",
    icon: Search,
  },
  {
    id: "goldenBatch",
    label: "Golden Batch",
    icon: Activity,
  },
  {
    id: "propagation",
    label: "Propagation",
    icon: Share2,
  },
  {
    id: "rcaQuality",
    label: "RCA Quality",
    icon: BarChart3,
  },
  {
    id: "auditLog",
    label: "Audit Log",
    icon: Clock,
  },
];

// For backward compatibility
export const NAVIGATION_ITEMS = NAV_ITEMS;

export default NAV_ITEMS;
