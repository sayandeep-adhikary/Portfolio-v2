import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-mono-label uppercase",
  {
    variants: {
      variant: {
        default: "border-border bg-secondary text-secondary-foreground",
        accent: "border-transparent bg-primary/10 text-primary",
        outline: "border-border bg-transparent text-foreground",
        success: "border-transparent bg-emerald-500/12 text-emerald-700 dark:text-emerald-400",
        warning: "border-transparent bg-amber-500/12 text-amber-800 dark:text-amber-400",
        muted: "border-border bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    /** Renders a leading status dot so state is not conveyed by color alone. */
    dot?: boolean;
  };

export function Badge({ className, variant, dot = false, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot ? <span aria-hidden className="size-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}

export { badgeVariants };
export type { BadgeProps };
