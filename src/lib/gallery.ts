import type { GalleryDisplayMode, GalleryItem } from "@/types/content";

/** Local fallback — intentionally empty. No fake personal photos are invented. */
export const galleryFallback: GalleryItem[] = [];

export type GalleryRole = "featured" | "landscape" | "portrait" | "square";

/** Auto-classification thresholds on the image aspect ratio (width / height). */
export const LANDSCAPE_MIN_RATIO = 1.4;
export const PORTRAIT_MAX_RATIO = 0.8;

/**
 * Presentation role for a gallery item: a manual `displayMode` always wins;
 * `auto` derives the role from the intrinsic aspect ratio. Deterministic.
 */
export function resolveGalleryRole(
  displayMode: GalleryDisplayMode,
  aspectRatio: number,
): GalleryRole {
  if (displayMode !== "auto") return displayMode;
  if (!Number.isFinite(aspectRatio) || aspectRatio <= 0) return "square";
  if (aspectRatio >= LANDSCAPE_MIN_RATIO) return "landscape";
  if (aspectRatio <= PORTRAIT_MAX_RATIO) return "portrait";
  return "square";
}

/**
 * Grid placement + responsive `sizes` per role. Column spans and aspect ratios
 * are tuned so non-featured tiles resolve to equal image heights on desktop
 * (portrait col-3, square col-4, landscape col-6 all ≈ the same height), which
 * keeps the editorial grid gap-free without a masonry library.
 */
export const GALLERY_ROLE_LAYOUT: Record<
  GalleryRole,
  { spanClass: string; aspectClass: string; sizes: string }
> = {
  featured: {
    spanClass: "col-span-2 md:col-span-12",
    aspectClass: "aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9]",
    sizes: "(min-width: 768px) 1152px, 100vw",
  },
  landscape: {
    spanClass: "col-span-2 md:col-span-6",
    aspectClass: "aspect-[3/2]",
    sizes: "(min-width: 768px) 576px, 100vw",
  },
  portrait: {
    spanClass: "col-span-1 md:col-span-3",
    aspectClass: "aspect-[3/4]",
    sizes: "(min-width: 768px) 288px, 50vw",
  },
  square: {
    spanClass: "col-span-1 md:col-span-4",
    aspectClass: "aspect-square",
    sizes: "(min-width: 768px) 384px, 50vw",
  },
};

/** Formats an optional ISO date to a compact, locale-stable label (server-safe). */
export function formatGalleryDate(date?: string): string {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}
