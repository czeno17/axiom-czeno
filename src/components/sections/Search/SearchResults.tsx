import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CitationChip } from "@/components/ui/CitationChip";
import { SEVERITY_BADGE, STATUS_BADGE } from "@/services/data/constants";
import { truncate } from "@/utils/formatting";
import type { SearchResult } from "@/hooks/useSearch";

interface SearchResultsProps {
  results: SearchResult[];
  fullQuery: string;
  totalIndexed: number;
}

export function SearchResults({ results, fullQuery, totalIndexed }: SearchResultsProps) {
  if (!fullQuery) {
    return <p className="text-sm text-slate-400">Enter a query above to search {totalIndexed} indexed events.</p>;
  }

  return (
    <div className="space-y-3">
      {results.map(({ event, hybrid, keywordScore, vectorScore }) => (
        <Card key={event.id} className="p-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <CitationChip id={event.eventId} />
              <Badge className={STATUS_BADGE[event.status]}>{event.status}</Badge>
              <Badge className={SEVERITY_BADGE[event.severity]}>{event.severity}</Badge>
              <span className="text-xs text-slate-500">
                {event.category} · {event.productLine}
              </span>
            </div>
            <span className="text-xs font-mono text-indigo-600">{Math.round(hybrid * 100)}% relevance</span>
          </div>
          <p className="text-sm font-medium text-slate-800">{event.title}</p>
          <p className="text-xs text-slate-500 mt-1">{truncate(event.description, 220)}</p>
          {event.rootCauseDescription && (
            <p className="text-xs text-slate-400 mt-1">
              <span className="font-medium">Root cause: </span>
              {truncate(event.rootCauseDescription, 160)}
            </p>
          )}
          <p className="text-[10px] text-slate-300 mt-1.5 font-mono">
            keyword {Math.round(keywordScore * 100)}% · vector {Math.round(vectorScore * 100)}%
          </p>
        </Card>
      ))}
      {fullQuery && results.length === 0 && <p className="text-sm text-slate-400">No matches above threshold. Try a broader query.</p>}
    </div>
  );
}
