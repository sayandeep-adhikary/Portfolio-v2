import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center rounded-md border border-border bg-secondary/50 px-2 py-0.5 font-mono text-body-s text-muted-foreground",
  {
    variants: {
      interactive: {
        // Faint accent tint fill on hover/focus for links or filters.
        true: "transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        false: "",
      },
    },
    defaultVariants: {
      interactive: false,
    },
  },
);

type TagProps = ComponentProps<"span"> &
  VariantProps<typeof tagVariants> & {
    asChild?: boolean;
  };

export function Tag({ className, interactive, asChild = false, ...props }: TagProps) {
  const Comp = asChild ? Slot : "span";
  return <Comp className={cn(tagVariants({ interactive }), className)} {...props} />;
}

export { tagVariants };
export type { TagProps };
