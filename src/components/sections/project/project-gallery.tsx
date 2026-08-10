import Image from "next/image";

import { CornerTicks } from "@/components/ui/corner-ticks";
import type { ProfileImage } from "@/types/content";

const PLACEHOLDER_TILES = 2;

export function ProjectGallery({ images }: { images: ProfileImage[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {images.length > 0
        ? images.map((image) => (
            <li
              key={image.src}
              className="rounded-card border-border bg-muted relative aspect-[16/10] overflow-hidden border"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 40vw, 100vw"
                placeholder={image.blurDataURL ? "blur" : "empty"}
                blurDataURL={image.blurDataURL}
                className="object-cover"
              />
            </li>
          ))
        : Array.from({ length: PLACEHOLDER_TILES }).map((_, tileIndex) => (
            <li
              key={tileIndex}
              className="rounded-card border-border bg-muted relative grid aspect-[16/10] place-items-center overflow-hidden border border-dashed"
            >
              <span className="text-muted-foreground/40 font-mono text-2xl">◆</span>
              <CornerTicks />
            </li>
          ))}
    </ul>
  );
}
