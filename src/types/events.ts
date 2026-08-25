export type EventType = "NCR" | "CAPA" | "AuditFinding";
export type Severity = "Minor" | "Major" | "Critical";
export type EventStatus = "Open" | "InReview" | "Closed" | "Archived";
export type Shift = "Day" | "Night";

export interface QualityEvent {
  id: string;
  eventId: string;
  type: EventType;
  title: string;
  description: string;
  severity: Severity;
  category: string;
  status: EventStatus;
  rootCauseCategory: string;
  rootCauseDescription: string;
  correctiveAction: string;
  preventiveAction: string;
  effectiveness: boolean | null;
  productLine: string;
  subAssembly: string;
  supplier: string;
  materialLot: string;
  operator: string;
  shift: Shift;
  assignedEngineer: string;
  createdAt: string;
  closedAt: string | null;
  aiSuggestedSeverity: string;
  aiSuggestedCategory: string;
  aiConfidence: number;
  humanAccepted: boolean | null;
}

export interface ClassificationResult {
  category: string;
  confidence: number;
}

export interface SeverityResult {
  severity: string;
  confidence: number;
}

export interface AssigneeResult {
  assignee: string;
  confidence: number;
}

export interface SimilarityMatch {
  event: QualityEvent;
  score: number;
}

export interface TriageAnalysis {
  category: ClassificationResult;
  severity: SeverityResult;
  assignee: AssigneeResult;
  similar: SimilarityMatch[];
}

export interface TriageFormState {
  title: string;
  description: string;
  productLine: string;
  subAssembly: string;
  supplier: string;
  materialLot: string;
  operator: string;
  shift: Shift;
}

export interface BatchParamDef {
  key: string;
  label: string;
  mean: number;
  sigma: number;
}

export interface BatchPoint {
  hour: string;
  [paramKey: string]: number | string;
}
