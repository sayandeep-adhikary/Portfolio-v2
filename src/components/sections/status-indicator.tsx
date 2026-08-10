import { Badge, type BadgeProps } from "@/components/ui/badge";
import type { CurrentStatus, StatusState } from "@/types/content";
import { cn } from "@/lib/utils";

const STATUS_VARIANT: Record<StatusState, NonNullable<BadgeProps["variant"]>> = {
  available: "success",
  open: "accent",
  "heads-down": "warning",
  unavailable: "muted",
};

export function StatusIndicator({
  status,
  className,
}: {
  status: CurrentStatus;
  className?: string;
}) {
  return (
    <Badge variant={STATUS_VARIANT[status.state]} dot className={cn(className)}>
      {status.label}
    </Badge>
  );
}
