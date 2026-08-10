import NextLink from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const linkVariants = cva(
  "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        // Underline draws in from the left on hover/focus (GPU-cheap background-size).
        underline:
          "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-px transition-[background-size] duration-200 ease-[var(--ease-out-expo)] hover:bg-[length:100%_1px] focus-visible:bg-[length:100%_1px]",
        subtle: "text-muted-foreground transition-colors hover:text-foreground",
        plain: "",
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  },
);

function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || /^(mailto:|tel:)/.test(href);
}

type LinkProps = ComponentProps<typeof NextLink> &
  VariantProps<typeof linkVariants> & {
    href: string;
  };

export function Link({ className, variant, href, children, ...props }: LinkProps) {
  const classes = cn(linkVariants({ variant }), className);

  if (isExternalHref(href)) {
    const { prefetch: _prefetch, ...anchorProps } = props;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes} {...props}>
      {children}
    </NextLink>
  );
}

export { linkVariants };
export type { LinkProps };
