import Image from "next/image";

import { CornerTicks } from "@/components/ui/corner-ticks";
import type { ProfileImage } from "@/types/content";

export function FeaturedCover({
  image,
  priority = false,
}: {
  image: ProfileImage | null;
  priority?: boolean;
}) {
  return (
    <div className="relative">
      {/* Static, filter-free accent glow. */}
      <div
        aria-hidden
        className="absolute inset-x-0 -inset-y-6 -z-10 rounded-full bg-[radial-gradient(55%_55%_at_60%_40%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent)]"
      />
      <div className="rounded-card border-border bg-muted relative aspect-[16/10] overflow-hidden border">
        {image ? (
          <>
            {/* Soft backdrop from the LQIP fills any letterbox area (no extra request). */}
            {image.blurDataURL ? (
              <div
                aria-hidden
                className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
                style={{ backgroundImage: `url(${image.blurDataURL})` }}
              />
            ) : null}
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={priority}
              quality={90}
              sizes="(min-width: 1024px) 48vw, 100vw"
              placeholder={image.blurDataURL ? "blur" : "empty"}
              blurDataURL={image.blurDataURL}
              className="object-contain"
            />
          </>
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
