"use client";

import { useMemo, useState, type ReactNode } from "react";

import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

export type FilterGridItem = {
  id: string;
  category: string;
  node: ReactNode;
};

export function FilterGrid({
  categories,
  items,
  filterLabel,
  emptyTitle,
  emptyHint = "Try another filter.",
  itemNoun = "item",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
}: {
  categories: string[];
  items: FilterGridItem[];
  filterLabel: string;
  emptyTitle: string;
  emptyHint?: string;
  itemNoun?: string;
  gridClassName?: string;
}) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((item) => item.category === active)),
    [active, items],
  );

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label={filterLabel} className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(category)}
              className={cn(
                "text-mono-label focus-visible:ring-ring focus-visible:ring-offset-background rounded-full border px-3 py-1 font-mono uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                isActive
                  ? "bg-primary text-primary-foreground border-transparent"
                  : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {filtered.length} {filtered.length === 1 ? itemNoun : `${itemNoun}s`}.
      </p>

      {filtered.length > 0 ? (
        <ul className={cn("grid gap-4 md:gap-6", gridClassName)}>
          {filtered.map((item) => (
            <li key={item.id}>{item.node}</li>
          ))}
        </ul>
      ) : (
        <EmptyState title={emptyTitle} hint={emptyHint} />
      )}
    </div>
  );
}
