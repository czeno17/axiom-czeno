import { Search } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useSearch } from "@/hooks/useSearch";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";

export function SemanticSearch() {
  const { query, setQuery, refine, setRefine, weight, setWeight, fullQuery, results, totalIndexed } = useSearch();

  return (
    <div>
      <SectionHeader
        icon={Search}
        title="Semantic Search & Knowledge Retrieval"
        subtitle="Ask about quality history in plain English. Hybrid search blends keyword overlap with TF-IDF cosine similarity across NCRs, CAPAs, and audit findings."
      />
      <SearchBar query={query} setQuery={setQuery} refine={refine} setRefine={setRefine} weight={weight} setWeight={setWeight} />
      <SearchResults results={results} fullQuery={fullQuery} totalIndexed={totalIndexed} />
    </div>
  );
}
