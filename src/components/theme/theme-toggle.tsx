"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Icon } from "@/components/ui/icon";
import { Moon, Sun } from "@/lib/icons";
import { cn } from "@/lib/utils";

const buttonClasses =
  "inline-flex size-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Theme is only known after hydration — guard to avoid a mismatch.
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span aria-hidden className={cn(buttonClasses, className)}>
        <span className="size-[18px]" />
      </span>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(buttonClasses, className)}
    >
      <Icon icon={isDark ? Sun : Moon} className="size-[18px]" />
    </button>
  );
}
