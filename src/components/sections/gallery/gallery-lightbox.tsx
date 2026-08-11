"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useCallback, useEffect } from "react";

import { Icon } from "@/components/ui/icon";
import { Mono } from "@/components/ui/typography";
import { formatGalleryDate } from "@/lib/gallery";
import { ArrowLeft, ArrowRight, X } from "@/lib/icons";
import type { GalleryItem } from "@/types/content";

const controlClasses =
  "inline-flex size-11 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-soft transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background supports-[backdrop-filter]:bg-background/60 supports-[backdrop-filter]:backdrop-blur";

export default function GalleryLightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const count = items.length;
  const goPrev = useCallback(
    () => onIndexChange((index - 1 + count) % count),
    [index, count, onIndexChange],
  );
  const goNext = useCallback(
    () => onIndexChange((index + 1) % count),
    [index, count, onIndexChange],
  );

  useEffect(() => {
    if (count <= 1) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      else if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext, count]);

  const item = items[index];
  if (!item) return null;

  const { image, caption, category, date, title } = item;
  const meta = [category, formatGalleryDate(date)].filter(Boolean).join(" · ");

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-background/85 supports-[backdrop-filter]:bg-background/70 fixed inset-0 z-50 supports-[backdrop-filter]:backdrop-blur-sm" />
        <Dialog.Content
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 flex flex-col gap-3 p-4 focus:outline-none sm:p-6"
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <Dialog.Description className="sr-only">{image.alt}</Dialog.Description>

          <div className="flex items-center justify-end">
            <Dialog.Close className={controlClasses} aria-label="Close viewer">
              <Icon icon={X} className="size-5" />
            </Dialog.Close>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            {count > 1 ? (
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous photo"
                className={`absolute left-0 z-10 ${controlClasses}`}
              >
                <Icon icon={ArrowLeft} className="size-5" />
              </button>
            ) : null}

            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="100vw"
              placeholder={image.blurDataURL ? "blur" : "empty"}
              blurDataURL={image.blurDataURL}
              className="max-h-full w-auto max-w-full rounded-lg object-contain"
            />

            {count > 1 ? (
              <button
                type="button"
                onClick={goNext}
                aria-label="Next photo"
                className={`absolute right-0 z-10 ${controlClasses}`}
              >
                <Icon icon={ArrowRight} className="size-5" />
              </button>
            ) : null}
          </div>

          {caption || meta ? (
            <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-center">
              {caption ? <span className="text-body-s text-foreground">{caption}</span> : null}
              {meta ? <Mono tone="muted">{meta}</Mono> : null}
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
