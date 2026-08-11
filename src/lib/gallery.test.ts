import { describe, expect, it } from "vitest";

import {
  formatGalleryDate,
  GALLERY_ROLE_LAYOUT,
  galleryFallback,
  resolveGalleryRole,
} from "@/lib/gallery";

describe("galleryFallback", () => {
  it("is empty — no invented personal content", () => {
    expect(galleryFallback).toEqual([]);
  });
});

describe("resolveGalleryRole", () => {
  it("classifies auto by aspect ratio", () => {
    expect(resolveGalleryRole("auto", 1.78)).toBe("landscape");
    expect(resolveGalleryRole("auto", 1.0)).toBe("square");
    expect(resolveGalleryRole("auto", 0.56)).toBe("portrait");
  });

  it("applies the guideline thresholds at the boundaries", () => {
    expect(resolveGalleryRole("auto", 1.4)).toBe("landscape");
    expect(resolveGalleryRole("auto", 0.8)).toBe("portrait");
    expect(resolveGalleryRole("auto", 1.2)).toBe("square");
  });

  it("honors manual overrides regardless of ratio", () => {
    expect(resolveGalleryRole("featured", 0.5)).toBe("featured");
    expect(resolveGalleryRole("landscape", 0.5)).toBe("landscape");
    expect(resolveGalleryRole("portrait", 2)).toBe("portrait");
    expect(resolveGalleryRole("square", 2)).toBe("square");
  });

  it("falls back to square for invalid ratios", () => {
    expect(resolveGalleryRole("auto", 0)).toBe("square");
    expect(resolveGalleryRole("auto", Number.NaN)).toBe("square");
    expect(resolveGalleryRole("auto", -1)).toBe("square");
  });
});

describe("GALLERY_ROLE_LAYOUT", () => {
  it("defines span, aspect, and responsive sizes for every role", () => {
    for (const role of ["featured", "landscape", "portrait", "square"] as const) {
      const layout = GALLERY_ROLE_LAYOUT[role];
      expect(layout.spanClass).toBeTruthy();
      expect(layout.aspectClass).toBeTruthy();
      expect(layout.sizes).toContain("vw");
    }
  });
});

describe("formatGalleryDate", () => {
  it("formats an ISO date to a compact, locale-stable label", () => {
    expect(formatGalleryDate("2024-06-15")).toBe("Jun 2024");
  });

  it("returns an empty string for missing or invalid dates", () => {
    expect(formatGalleryDate()).toBe("");
    expect(formatGalleryDate("")).toBe("");
    expect(formatGalleryDate("not-a-date")).toBe("");
  });
});
