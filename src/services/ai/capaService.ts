// src/services/ai/capaService.ts

export interface CAPA {
  id: string;
  ncrId: string; // Reference to the original NCR

  // Root Cause Analysis
  rootCause: {
    description: string;
    category: string;
    evidence: string[];
    analysisMethod: "5-Why" | "Fishbone" | "FMEA" | "Other";
  };

  // Corrective Actions (fix the immediate issue)
  correctiveActions: {
    action: string;
    responsible: string;
    dueDate: string;
    status: "Pending" | "InProgress" | "Completed";
    verification: string; // How to verify it worked
  }[];

  // Preventive Actions (stop it happening again)
  preventiveActions: {
    action: string;
    responsible: string;
    dueDate: string;
    status: "Pending" | "InProgress" | "Completed";
  }[];

  // Effectiveness Check
  effectiveness: {
    verified: boolean;
    verificationDate: string;
    verifiedBy: string;
    notes: string;
  };

  // Lessons Learned
  lessonsLearned: string;
  crossFunctionalImpact: string[]; // Other areas affected

  // Tracking
  status: "Draft" | "InReview" | "Approved" | "InProgress" | "Closed";
  created: string;
  closed: string | null;
  closedBy: string | null;
}

export class CAPAService {
  static async createCAPA(triageResult: TriageResult, ncrId: string): Promise<CAPA> {
    // Deep dive analysis - takes more time
    const rootCause = await this.performRootCauseAnalysis(triageResult);

    // Define corrective actions
    const correctiveActions = await this.defineCorrectiveActions(rootCause);

    // Define preventive actions
    const preventiveActions = await this.definePreventiveActions(rootCause);

    return {
      id: this.generateCAPAId(),
      ncrId,
      rootCause,
      correctiveActions,
      preventiveActions,
      effectiveness: {
        verified: false,
        verificationDate: "",
        verifiedBy: "",
        notes: "",
      },
      lessonsLearned: "",
      crossFunctionalImpact: [],
      status: "Draft",
      created: new Date().toISOString(),
      closed: null,
      closedBy: null,
    };
  }

  static async performRootCauseAnalysis(triageResult: TriageResult): Promise<any> {
    // This is the "deep" analysis - not just triage
    // 5-Why analysis, Fishbone, etc.
    return {
      description: "Root cause identified through 5-Why analysis...",
      category: triageResult.category,
      evidence: ["Data point 1", "Data point 2"],
      analysisMethod: "5-Why",
    };
  }
}
