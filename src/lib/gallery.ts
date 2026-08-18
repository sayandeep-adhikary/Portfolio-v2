import type { GalleryItem } from "@/types/content";

/** Local fallback — intentionally empty. No fake personal photos are invented. */
export const galleryFallback: GalleryItem[] = [];

export type GalleryRole = "featured" | "landscape" | "portrait" | "square";

/** Auto-classification thresholds on the image aspect ratio (width / height). */
export const LANDSCAPE_MIN_RATIO = 1.2;
export const PORTRAIT_MAX_RATIO = 0.85;

/**
 * Role derived solely from the intrinsic aspect ratio; no manual display mode is
 * needed for the masonry gallery.
 */
export function resolveGalleryRole(aspectRatio: number): GalleryRole {
  if (!Number.isFinite(aspectRatio) || aspectRatio <= 0) return "square";
  if (aspectRatio >= LANDSCAPE_MIN_RATIO) return "landscape";
  if (aspectRatio <= PORTRAIT_MAX_RATIO) return "portrait";
  return "square";
}

/**
 * Masonry-friendly roles. Each role still preserves the editor's intended visual
 * emphasis via aspect ratio, but the layout itself is column-based so mixed
 * Sanity image sizes fill the wall without leaving awkward blank gaps.
 */
export const GALLERY_ROLE_LAYOUT: Record<
  GalleryRole,
  { spanClass: string; aspectClass: string; sizes: string }
> = {
  featured: {
    spanClass: "w-full",
    aspectClass: "aspect-[5/3] md:aspect-[18/9]",
    sizes: "(min-width: 1280px) 32vw, (min-width: 768px) 40vw, 100vw",
  },
  landscape: {
    spanClass: "w-full",
    aspectClass: "aspect-[21/9] md:aspect-[24/10]",
    sizes: "(min-width: 1280px) 28vw, (min-width: 768px) 36vw, 100vw",
  },
  portrait: {
    spanClass: "w-full",
    aspectClass: "aspect-[4/5]",
    sizes: "(min-width: 1280px) 18vw, (min-width: 768px) 24vw, 50vw",
  },
  square: {
    spanClass: "w-full",
    aspectClass: "aspect-square",
    sizes: "(min-width: 1280px) 18vw, (min-width: 768px) 24vw, 50vw",
  },
};

/** Formats an optional ISO date to a compact, locale-stable label (server-safe). */
export function formatGalleryDate(date?: string): string {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}
