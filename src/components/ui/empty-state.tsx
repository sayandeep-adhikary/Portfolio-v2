import type { ReactNode } from "react";

import { Mono, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

/**
 * Consistent empty-state placeholder for collections that resolve to nothing
 * (no CMS entries, an empty filter, etc.). Keeps the layout intentional rather
 * than leaving a blank gap.
 */
export function EmptyState({
  title,
  hint,
  action,
  className,
}: {
  title: string;
  hint?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card border-border flex flex-col items-center gap-2 border border-dashed px-6 py-16 text-center",
        className,
      )}
    >
      <Mono tone="muted">{title}</Mono>
      {hint ? (
        <Text size="body-s" tone="muted">
          {hint}
        </Text>
      ) : null}
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  );
}
