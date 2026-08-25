export type AuditAction = "Accepted" | "Edited" | "Rejected" | "Nudge Sent" | string;

export interface AuditEntry {
  id: string;
  ts: string;
  actor: string;
  action: AuditAction;
  eventId: string;
  field: string;
  before: string;
  after: string;
  reason: string;
}

export type AuditEntryInput = Omit<AuditEntry, "id" | "ts">;
