import {
  LayoutDashboard, ListChecks, Search, Activity, GitBranch, ClipboardCheck, ScrollText,
  type LucideIcon,
} from "lucide-react";
import type { TabId } from "@/stores/uiStore";

export interface NavItem {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "triage", label: "CAPA Triage", icon: ListChecks },
  { id: "search", label: "Semantic Search", icon: Search },
  { id: "batch", label: "Golden Batch", icon: Activity },
  { id: "propagation", label: "Propagation", icon: GitBranch },
  { id: "rca", label: "RCA Quality", icon: ClipboardCheck },
  { id: "audit", label: "Audit Log", icon: ScrollText },
];
