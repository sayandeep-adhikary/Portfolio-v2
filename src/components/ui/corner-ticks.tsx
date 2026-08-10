import { cn } from "@/lib/utils";

/** Decorative L-shaped corner marks — the framed-media identity motif. */
export function CornerTicks({ className }: { className?: string }) {
  const base = "pointer-events-none absolute size-4 border-primary/70";
  return (
    <div aria-hidden className={className}>
      <span className={cn(base, "top-3 left-3 border-t-2 border-l-2")} />
      <span className={cn(base, "top-3 right-3 border-t-2 border-r-2")} />
      <span className={cn(base, "bottom-3 left-3 border-b-2 border-l-2")} />
      <span className={cn(base, "right-3 bottom-3 border-r-2 border-b-2")} />
    </div>
  );
}
