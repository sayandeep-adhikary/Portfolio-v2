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
  it("classifies by aspect ratio", () => {
    expect(resolveGalleryRole(1.78)).toBe("landscape");
    expect(resolveGalleryRole(1.0)).toBe("square");
    expect(resolveGalleryRole(0.56)).toBe("portrait");
  });

  it("applies the guideline thresholds at the boundaries", () => {
    expect(resolveGalleryRole(1.2)).toBe("landscape");
    expect(resolveGalleryRole(0.85)).toBe("portrait");
    expect(resolveGalleryRole(1.1)).toBe("square");
  });

  it("falls back to square for invalid ratios", () => {
    expect(resolveGalleryRole(0)).toBe("square");
    expect(resolveGalleryRole(Number.NaN)).toBe("square");
    expect(resolveGalleryRole(-1)).toBe("square");
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

  it("preserves display-mode emphasis through distinct masonry aspect classes", () => {
    expect(GALLERY_ROLE_LAYOUT.featured.aspectClass).toContain("aspect-[5/3]");
    expect(GALLERY_ROLE_LAYOUT.landscape.aspectClass).toContain("aspect-[21/9]");
    expect(GALLERY_ROLE_LAYOUT.portrait.aspectClass).toContain("aspect-[4/5]");
    expect(GALLERY_ROLE_LAYOUT.square.aspectClass).toContain("aspect-square");
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
