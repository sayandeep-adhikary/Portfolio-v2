import { cn } from "@/lib/utils";

/**
 * Decorative ambient color wash (indigo ↔ cyan). Purely visual and inert.
 * Place inside a relatively-positioned `isolate` parent; sits behind content.
 */
export function Glow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10 rounded-full opacity-60 blur-2xl",
        className,
      )}
      style={{
        background:
          "radial-gradient(closest-side, color-mix(in oklch, var(--primary) 55%, transparent), color-mix(in oklch, var(--accent-2) 42%, transparent) 55%, transparent)",
      }}
    />
  );
}
