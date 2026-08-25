// src/components/sections/CAPA/CAPACreate.tsx

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { X } from "lucide-react";

export function CAPACreate({
  onClose,
  onSuccess,
}: {
  onClose?: () => void;
  onSuccess?: () => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "Medium",
    category: "Quality",
    assignee: "",
    productLine: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating CAPA:", formData);
    if (onSuccess) onSuccess();
    if (onClose) onClose();
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Create New CAPA</h2>
        <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter CAPA title"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description *</label>
            <textarea
              className="w-full p-2 border rounded-lg min-h-[80px]"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the issue in detail"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Severity</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
              >
                <option value="Critical">Critical</option>
                <option value="Major">Major</option>
                <option value="Medium">Medium</option>
                <option value="Minor">Minor</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Quality">Quality</option>
                <option value="Process">Process</option>
                <option value="Equipment">Equipment</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Packaging">Packaging</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Assignee</label>
              <Input
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                placeholder="e.g., Process-Owner-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Product Line</label>
              <Input
                value={formData.productLine}
                onChange={(e) => setFormData({ ...formData, productLine: e.target.value })}
                placeholder="e.g., Line A"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
              Create CAPA
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
