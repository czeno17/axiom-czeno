import { describe, expect, it } from "vitest";
import { formatPercent, truncate } from "@/utils/formatting";

describe("formatting", () => {
  it("formats a fraction as a rounded percent", () => {
    expect(formatPercent(0.834)).toBe("83%");
  });

  it("truncates long text with an ellipsis", () => {
    expect(truncate("abcdefgh", 4)).toBe("abcd…");
    expect(truncate("abc", 4)).toBe("abc");
  });
});
