"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Sticky header wrapper. A 1px sentinel above the header is watched by a single
 * IntersectionObserver; crossing it toggles `data-scrolled` directly on the
 * header node (no React state → zero re-renders, no scroll listener).
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const headerRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const sentinel = sentinelRef.current;
    if (!header || !sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          header.dataset.scrolled = entry.isIntersecting ? "false" : "true";
        }
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="absolute inset-x-0 top-0 h-px" />
      <header
        ref={headerRef}
        data-scrolled="false"
        className={cn(
          "sticky top-0 z-40 w-full border-b border-transparent transition-colors duration-200",
          "data-[scrolled=true]:border-border data-[scrolled=true]:bg-background/85",
          "data-[scrolled=true]:supports-[backdrop-filter]:bg-background/70 data-[scrolled=true]:supports-[backdrop-filter]:backdrop-blur",
        )}
      >
        {children}
      </header>
    </>
  );
}
