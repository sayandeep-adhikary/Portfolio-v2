import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-card border border-border bg-card text-card-foreground", {
  variants: {
    variant: {
      // Static surface separated by contrast + hairline, no shadow at rest.
      default: "",
      // Lifts on hover — the only place the soft shadow appears.
      interactive:
        "transition-[box-shadow,border-color,translate] duration-200 ease-[var(--ease-out-expo)] hover:border-foreground/15 hover:shadow-soft hover:-translate-y-0.5",
    },
    padding: {
      none: "",
      default: "p-6 md:p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "default",
  },
});

type CardProps = ComponentProps<"div"> & VariantProps<typeof cardVariants>;

export function Card({ className, variant, padding, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant, padding }), className)} {...props} />;
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3 className={cn("text-heading-s text-card-foreground font-medium", className)} {...props} />
  );
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-body-s text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mt-4", className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mt-6 flex items-center gap-3", className)} {...props} />;
}

export { cardVariants };
export type { CardProps };
