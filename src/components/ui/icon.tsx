import type { LucideIcon, LucideProps } from "lucide-react";

import { cn } from "@/lib/utils";

type IconProps = LucideProps & {
  icon: LucideIcon;
};

/**
 * Standardizes icon size and stroke weight across the UI so icons stay
 * optically consistent with the type. Defaults to 16px / 1.75 stroke.
 */
export function Icon({
  icon: LucideComponent,
  className,
  strokeWidth = 1.75,
  ...props
}: IconProps) {
  return (
    <LucideComponent
      aria-hidden="true"
      focusable="false"
      strokeWidth={strokeWidth}
      className={cn("size-4 shrink-0", className)}
      {...props}
    />
  );
}

export type { IconProps };
