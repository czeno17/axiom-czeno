export function formatPercent(fraction: number): string {
  return `${Math.round(fraction * 100)}%`;
}

export function truncate(text: string, maxLen: number): string {
  if (!text) return "";
  return text.length > maxLen ? `${text.slice(0, maxLen)}…` : text;
}
