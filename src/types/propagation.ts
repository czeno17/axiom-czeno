import type { QualityEvent } from "./events";

export interface PropagationCandidate {
  line: string;
  evidence: QualityEvent | null;
  total: number;
}
