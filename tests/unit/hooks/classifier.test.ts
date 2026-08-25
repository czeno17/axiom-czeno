import { describe, expect, it } from "vitest";
import { classifyCategory, classifySeverity } from "@/services/ai/classifier";

describe("classifier heuristics", () => {
  it("classifies a flatness-worded NCR as Flatness", () => {
    const result = classifyCategory("Heat sink base flatness exceeds tolerance, warpage observed");
    expect(result.category).toBe("Flatness");
    expect(result.confidence).toBeGreaterThan(0.5);
  });

  it("classifies a field-failure worded NCR as Critical", () => {
    const result = classifySeverity("Customer complaint: field failure caused server shutdown");
    expect(result.severity).toBe("Critical");
  });
});
