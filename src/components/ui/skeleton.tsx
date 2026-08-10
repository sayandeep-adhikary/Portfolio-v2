import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Low-level loading placeholder. Compose several to mirror real content and
 * minimize layout shift. Decorative — hidden from assistive tech by callers.
 */
export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("bg-muted animate-pulse rounded-md", className)} {...props} />;
}
