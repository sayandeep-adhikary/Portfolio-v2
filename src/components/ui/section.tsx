import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Container — horizontal max-width + gutters                                 */
/* -------------------------------------------------------------------------- */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Section — semantic vertical rhythm (8-pt: 96 / 128 / 160)                  */
/* -------------------------------------------------------------------------- */
const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      default: "py-24 md:py-32 lg:py-40",
      compact: "py-16 md:py-20 lg:py-24",
      none: "",
    },
  },
  defaultVariants: {
    spacing: "default",
  },
});

type SectionProps = ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> & {
    /** When true, content is wrapped in a Container automatically. */
    contained?: boolean;
    /** Opt into the scroll-triggered fade+slide reveal for this section's content. */
    reveal?: boolean;
  };

export function Section({
  className,
  spacing,
  contained = true,
  reveal = false,
  children,
  ...props
}: SectionProps) {
  const revealClass = reveal ? "reveal" : undefined;
  return (
    <section className={cn(sectionVariants({ spacing }), className)} {...props}>
      {contained ? (
        <Container className={revealClass}>{children}</Container>
      ) : revealClass ? (
        <div className={revealClass}>{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

export { sectionVariants };
export type { SectionProps };
