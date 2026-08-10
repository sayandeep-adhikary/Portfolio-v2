import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type DividerProps = Omit<ComponentProps<"div">, "role"> & {
  orientation?: "horizontal" | "vertical";
  /** Purely decorative when true (removed from the accessibility tree). */
  decorative?: boolean;
};

export function Divider({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: DividerProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "bg-border shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}

export type { DividerProps };
