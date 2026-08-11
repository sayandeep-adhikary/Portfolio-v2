import Image from "next/image";

import { GalleryInteractive } from "@/components/sections/gallery/gallery-interactive";
import { Section } from "@/components/ui/section";
import { Heading, Mono, Text } from "@/components/ui/typography";
import { formatGalleryDate, GALLERY_ROLE_LAYOUT, resolveGalleryRole } from "@/lib/gallery";
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
        <ul className="mt-12 grid grid-flow-row-dense grid-cols-2 gap-3 sm:gap-4 md:mt-16 md:grid-cols-12 md:gap-5">
          {items.map((item, index) => {
            const role = resolveGalleryRole(item.displayMode, item.image.aspectRatio);
            const layout = GALLERY_ROLE_LAYOUT[role];
            const meta = [item.category, formatGalleryDate(item.date)].filter(Boolean).join(" · ");

            return (
              <li key={item.id} className={layout.spanClass}>
                <figure className="group flex flex-col gap-2">
                  <button
                    type="button"
                    data-gallery-index={index}
                    aria-label={`View photo: ${item.image.alt || item.title}`}
                    className={`bg-muted border-border focus-visible:ring-ring focus-visible:ring-offset-background group-hover:border-foreground/15 relative block w-full overflow-hidden rounded-lg border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${layout.aspectClass}`}
                  >
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      loading="lazy"
                      sizes={layout.sizes}
                      placeholder={item.image.blurDataURL ? "blur" : "empty"}
                      blurDataURL={item.image.blurDataURL}
                      className="object-cover transition-[scale] duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.02]"
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
