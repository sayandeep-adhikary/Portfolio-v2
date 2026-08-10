"use client";

import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { Check, Copy } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function CopyButton({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — silently ignore.
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={label}
        className={cn(
          "border-border text-mono-label text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          className,
        )}
      >
        <Icon icon={copied ? Check : Copy} className="size-3.5" />
        <span aria-hidden>{copied ? "Copied" : "Copy"}</span>
      </button>
      {/* Announce success without changing the button's accessible name. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </>
  );
}
