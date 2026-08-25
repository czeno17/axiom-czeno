// src/components/sections/capa/RootCauseAnalysis.tsx

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function RootCauseAnalysis({ capa }: { capa: any }) {
  const [method, setMethod] = useState("5-Why");

  if (!capa) {
    return (
      <Card className="p-4">
        <p className="text-slate-500">No CAPA selected for RCA.</p>
      </Card>
    );
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Button
          variant="outline"
          className={method === "5-Why" ? "bg-indigo-50 border-indigo-300" : ""}
          onClick={() => setMethod("5-Why")}
        >
          5-Why Analysis
        </Button>
        <Button
          variant="outline"
          className={method === "Fishbone" ? "bg-indigo-50 border-indigo-300" : ""}
          onClick={() => setMethod("Fishbone")}
        >
          Fishbone Diagram
        </Button>
        <Button
          variant="outline"
          className={method === "FMEA" ? "bg-indigo-50 border-indigo-300" : ""}
          onClick={() => setMethod("FMEA")}
        >
          FMEA
        </Button>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Root Cause Analysis</h3>
        <p className="text-sm text-slate-600 mb-4">
          {capa.rootCauseDescription || "No root cause analysis available."}
        </p>

        {capa.rootCauseDescription && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500">Method</p>
              <p className="text-sm">{method}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Verified By</p>
              <p className="text-sm">{capa.closedBy || "Not verified"}</p>
            </div>
          </div>
        )}

        {!capa.rootCauseDescription && (
          <p className="text-sm text-amber-600">
            <Badge className="bg-amber-100 text-amber-800">Pending</Badge> Root cause analysis has
            not been completed yet.
          </p>
        )}
      </Card>
    </div>
  );
}
