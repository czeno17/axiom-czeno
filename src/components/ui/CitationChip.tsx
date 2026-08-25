interface CitationChipProps {
  id: string;
  onClick?: () => void;
}

export function CitationChip({ id, onClick }: CitationChipProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-mono hover:bg-indigo-700"
    >
      {id}
    </button>
  );
}
