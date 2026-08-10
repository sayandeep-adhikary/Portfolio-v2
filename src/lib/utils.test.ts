import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges conditional class names", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });

  it("dedupes conflicting Tailwind utilities (last wins)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("keeps a text color alongside a custom text-size utility", () => {
    // Regression: tailwind-merge must not treat custom font sizes as colors.
    const result = cn("text-primary-foreground", "text-body-m");
    expect(result).toContain("text-primary-foreground");
    expect(result).toContain("text-body-m");
  });

  it("still merges two custom text sizes (last wins)", () => {
    expect(cn("text-body-s", "text-body-m")).toBe("text-body-m");
  });
});
