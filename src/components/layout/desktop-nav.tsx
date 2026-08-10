"use client";

import { useEffect, useState } from "react";

import { Mono } from "@/components/ui/typography";
import { sectionIdFromHref, type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * Tracks the section currently in view with a single IntersectionObserver.
 * Returns "" until a section is active, matching server output (no hydration
 * mismatch). Updates state only when the active id actually changes.
 */
function useActiveSection(sectionKey: string): string {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const ids = sectionKey ? sectionKey.split("|") : [];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        setActiveId((prev) => (best && best !== prev ? best : prev));
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [sectionKey]);

  return activeId;
}

export function DesktopNav({ items, className }: { items: NavItem[]; className?: string }) {
  const sectionKey = items
    .map((item) => sectionIdFromHref(item.href))
    .filter(Boolean)
    .join("|");
  const activeId = useActiveSection(sectionKey);

  return (
    <nav aria-label="Primary" className={cn("hidden items-center gap-6 md:flex", className)}>
      {items.map((item) => {
        const isActive = sectionIdFromHref(item.href) === activeId;
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={isActive ? "true" : undefined}
            data-active={isActive}
            className="group text-body-s text-muted-foreground hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background data-[active=true]:text-foreground inline-flex items-center gap-1.5 rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Mono
              aria-hidden
              tone="accent"
              uppercase={false}
              className="opacity-0 transition-opacity group-data-[active=true]:opacity-100"
            >
              ·
            </Mono>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
