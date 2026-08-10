import { describe, expect, it } from "vitest";

import { sectionIdFromHref } from "@/lib/navigation";

describe("sectionIdFromHref", () => {
  it("extracts the id after the hash", () => {
    expect(sectionIdFromHref("/#work")).toBe("work");
    expect(sectionIdFromHref("#contact")).toBe("contact");
  });

  it("returns an empty string when there is no hash", () => {
    expect(sectionIdFromHref("/work")).toBe("");
    expect(sectionIdFromHref("")).toBe("");
  });
});
