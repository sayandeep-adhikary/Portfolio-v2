"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

import type { GalleryItem } from "@/types/content";

// The full-screen viewer is code-split so it never ships in the initial bundle;
// it loads only when a photo is first opened.
const GalleryLightbox = dynamic(() => import("@/components/sections/gallery/gallery-lightbox"), {
  ssr: false,
});

/**
 * Thin client boundary around the server-rendered grid. A single delegated
 * click listener opens the lazy viewer, so individual tiles stay server-rendered
 * and no per-tile JavaScript is shipped.
 */
export function GalleryInteractive({
  items,
  children,
}: {
  items: GalleryItem[];
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest<HTMLElement>("[data-gallery-index]");
      if (!trigger) return;
      const index = Number(trigger.dataset.galleryIndex);
      if (Number.isInteger(index)) setOpenIndex(index);
    };

    el.addEventListener("click", handleClick);
    return () => el.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={containerRef}>
      {children}
      {openIndex !== null ? (
        <GalleryLightbox
          items={items}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      ) : null}
    </div>
  );
}
