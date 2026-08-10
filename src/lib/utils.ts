import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The design system defines custom font-size utilities (`text-display-*`,
 * `text-heading-*`, `text-body-*`, `text-mono-label`). tailwind-merge doesn't
 * know these are font sizes, so by default it treats them as text *colors* and
 * drops a real `text-<color>` when both appear on one element (e.g. a primary
 * button lost `text-primary-foreground`). Registering them in the `font-size`
 * group keeps size and colour as independent, correctly-merged concerns.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "display-l",
            "heading-m",
            "heading-s",
            "body-l",
            "body-m",
            "body-s",
            "mono-label",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
