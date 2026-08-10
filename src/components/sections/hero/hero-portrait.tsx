import Image from "next/image";

import { CornerTicks } from "@/components/ui/corner-ticks";
import type { ProfileImage } from "@/types/content";

export function HeroPortrait({ image }: { image: ProfileImage | null }) {
  return (
    <div className="relative mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none">
      {/* Static, filter-free accent glow — cheap on low-end devices. */}
      <div
        aria-hidden
        className="absolute inset-x-0 -inset-y-6 -z-10 rounded-full bg-[radial-gradient(60%_60%_at_50%_35%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent)]"
      />
      <div className="rounded-card border-border bg-card relative aspect-[4/5] overflow-hidden border">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 80vw"
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--muted-foreground)_8%,transparent),transparent)]"
          />
        )}
        <CornerTicks />
      </div>
    </div>
  );
}
