import type { TriageFormState } from "@/types";

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function validateTriageForm(form: TriageFormState): string | null {
  if (!isNonEmpty(form.title) && !isNonEmpty(form.description)) {
    return "Enter a title or description before running analysis.";
  }
  return null;
}
