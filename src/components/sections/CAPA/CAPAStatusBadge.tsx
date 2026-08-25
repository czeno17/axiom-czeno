// src/components/sections/CAPA/CAPAStatusBadge.tsx

export function CAPAStatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Open: "bg-amber-100 text-amber-800",
    "In Progress": "bg-blue-100 text-blue-800",
    InReview: "bg-purple-100 text-purple-800",
    Approved: "bg-green-100 text-green-800",
    Closed: "bg-emerald-100 text-emerald-800",
    Archived: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-800"}`}
    >
      {status}
    </span>
  );
}
