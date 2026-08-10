import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Input({ className, type = "text", ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "border-input text-body-m text-foreground flex h-11 w-full rounded-md border bg-transparent px-3 py-2 transition-colors",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:text-body-s file:border-0 file:bg-transparent file:font-medium",
        className,
      )}
      {...props}
    />
  );
}
