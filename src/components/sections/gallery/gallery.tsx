import Image from "next/image";

import { GalleryInteractive } from "@/components/sections/gallery/gallery-interactive";
import { Section } from "@/components/ui/section";
import { Heading, Mono, Text } from "@/components/ui/typography";
import { formatGalleryDate } from "@/lib/gallery";
import { getGalleryItems } from "@/sanity/lib/loaders";

export async function Gallery() {
  const items = await getGalleryItems();

  // Quietly hide the entire section when there are no photographs.
  if (items.length === 0) return null;

  return (
    <Section id="gallery" reveal glow="left" aria-labelledby="gallery-heading">
      <header className="flex max-w-2xl flex-col gap-4">
        <Mono tone="accent">Personal</Mono>
        <Heading id="gallery-heading" as="h2" size="display-l" gradient>
          A little beyond the code.
        </Heading>
        <Text size="body-l" tone="muted" className="max-w-xl">
          Some moments, places, people and things I enjoy.
        </Text>
      </header>

      <GalleryInteractive items={items}>
        <ul className="mt-12 columns-1 gap-3 sm:columns-2 md:mt-16 lg:columns-3 xl:columns-4">
          {items.map((item, index) => {
            const meta = [item.category, formatGalleryDate(item.date)].filter(Boolean).join(" · ");

            return (
              <li key={item.id} className="mb-3 block break-inside-avoid">
                <figure className="group flex h-full flex-col gap-2">
                  <button
                    type="button"
                    data-gallery-index={index}
                    aria-label={`View photo: ${item.image.alt || item.title}`}
                    className="bg-muted border-border focus-visible:ring-ring focus-visible:ring-offset-background group-hover:border-foreground/15 relative block w-full overflow-hidden rounded-lg border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      placeholder={item.image.blurDataURL ? "blur" : "empty"}
                      blurDataURL={item.image.blurDataURL}
                      className="block h-auto w-full object-contain transition-[transform,filter] duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.02]"
                    />
                  </button>

                  {item.caption || meta ? (
                    <figcaption className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 px-0.5">
                      {item.caption ? (
                        <span className="text-body-s text-foreground">{item.caption}</span>
                      ) : null}
                      {meta ? <Mono tone="muted">{meta}</Mono> : null}
                    </figcaption>
                  ) : null}
                </figure>
              </li>
            );
          })}
        </ul>
      </GalleryInteractive>
    </Section>
  );
}
