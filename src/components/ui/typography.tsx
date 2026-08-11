import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ElementType } from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Heading                                                                    */
/* -------------------------------------------------------------------------- */
const headingVariants = cva("font-sans text-foreground text-balance", {
  variants: {
    size: {
      "display-xl": "text-display-xl font-medium",
      "display-l": "text-display-l font-medium",
      "heading-m": "text-heading-m font-medium",
      "heading-s": "text-heading-s font-medium",
    },
    gradient: {
      true: "text-gradient-brand",
      false: "",
    },
  },
  defaultVariants: {
    size: "heading-m",
    gradient: false,
  },
});

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = Omit<ComponentProps<"h2">, "color"> &
  VariantProps<typeof headingVariants> & {
    as?: HeadingLevel;
  };

export function Heading({ as = "h2", size, gradient, className, ...props }: HeadingProps) {
  const Tag = as as ElementType;
  return <Tag className={cn(headingVariants({ size, gradient }), className)} {...props} />;
}

/* -------------------------------------------------------------------------- */
/* Text                                                                       */
/* -------------------------------------------------------------------------- */
const textVariants = cva("font-sans", {
  variants: {
    size: {
      "body-l": "text-body-l",
      "body-m": "text-body-m",
      "body-s": "text-body-s",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
    },
    balance: {
      true: "text-pretty",
      false: "",
    },
  },
  defaultVariants: {
    size: "body-m",
    tone: "default",
    balance: false,
  },
});

type TextProps = Omit<ComponentProps<"p">, "color"> &
  VariantProps<typeof textVariants> & {
    as?: Extract<ElementType, "p" | "span" | "div">;
  };

export function Text({ as = "p", size, tone, balance, className, ...props }: TextProps) {
  const Tag = as as ElementType;
  return <Tag className={cn(textVariants({ size, tone, balance }), className)} {...props} />;
}

/* -------------------------------------------------------------------------- */
/* Mono — metadata, indices, technical labels only                           */
/* -------------------------------------------------------------------------- */
const monoVariants = cva("font-mono text-mono-label", {
  variants: {
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      accent: "text-primary",
    },
    uppercase: {
      true: "uppercase",
      false: "",
    },
  },
  defaultVariants: {
    tone: "muted",
    uppercase: true,
  },
});

type MonoProps = Omit<ComponentProps<"span">, "color"> &
  VariantProps<typeof monoVariants> & {
    as?: Extract<ElementType, "span" | "p" | "div">;
  };

export function Mono({ as = "span", tone, uppercase, className, ...props }: MonoProps) {
  const Tag = as as ElementType;
  return <Tag className={cn(monoVariants({ tone, uppercase }), className)} {...props} />;
}

export { headingVariants, textVariants, monoVariants };
export type { HeadingProps, TextProps, MonoProps };
