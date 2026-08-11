"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/icon";
import { Mono } from "@/components/ui/typography";
import { formatGalleryDate } from "@/lib/gallery";
import { ArrowLeft, ArrowRight, X } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/content";

const controlClasses =
  "inline-flex size-11 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-soft transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background supports-[backdrop-filter]:bg-background/60 supports-[backdrop-filter]:backdrop-blur";

// Minimum horizontal travel (px) to register a swipe.
const SWIPE_THRESHOLD = 48;

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
  const [direction, setDirection] = useState<1 | -1>(1);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const goTo = useCallback(
    (nextIndex: number, dir: 1 | -1) => {
      if (count <= 1) return;
      setDirection(dir);
      onIndexChange((nextIndex + count) % count);
    },
    [count, onIndexChange],
  );
  const goPrev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1, 1), [goTo, index]);

  useEffect(() => {
    if (count <= 1) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      else if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext, count]);

  function handlePointerDown(event: React.PointerEvent) {
    pointerStart.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function handlePointerUp(event: React.PointerEvent) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goNext();
      else goPrev();
    }
  }

  const item = items[index];
  if (!item) return null;

  const { image, caption, category, date, title } = item;
  const meta = [category, formatGalleryDate(date)].filter(Boolean).join(" · ");
  const hasCaption = Boolean(caption || meta);

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

          <div className="flex items-center justify-between">
            {count > 1 ? (
              <Mono tone="muted">
                {index + 1} / {count}
              </Mono>
            ) : (
              <span />
            )}
            <Dialog.Close className={controlClasses} aria-label="Close viewer">
              <Icon icon={X} className="size-5" />
            </Dialog.Close>
          </div>

          {/* Clean image area — swipe (touch/mouse/pen) navigates; nothing overlays the photo. */}
          <div
            className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center select-none"
            style={{ cursor: count > 1 ? "grab" : undefined }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              pointerStart.current = null;
            }}
          >
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="100vw"
              draggable={false}
              placeholder={image.blurDataURL ? "blur" : "empty"}
              blurDataURL={image.blurDataURL}
              className={cn(
                "max-h-full w-auto max-w-full rounded-lg object-contain",
                direction === 1 ? "animate-gallery-slide-right" : "animate-gallery-slide-left",
              )}
            />
          </div>

          {/* Controls sit below the photo — a single-pointer alternative to swiping. */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 justify-start">
              {count > 1 ? (
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous photo"
                  className={controlClasses}
                >
                  <Icon icon={ArrowLeft} className="size-5" />
                </button>
              ) : null}
            </div>

            {hasCaption ? (
              <div className="flex flex-[2] flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-center">
                {caption ? <span className="text-body-s text-foreground">{caption}</span> : null}
                {meta ? <Mono tone="muted">{meta}</Mono> : null}
              </div>
            ) : (
              <div className="flex-[2]" />
            )}

            <div className="flex flex-1 justify-end">
              {count > 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next photo"
                  className={controlClasses}
                >
                  <Icon icon={ArrowRight} className="size-5" />
                </button>
              ) : null}
            </div>
          </div>

          <p aria-live="polite" className="sr-only">
            {count > 1 ? `Photo ${index + 1} of ${count}. ${image.alt}` : ""}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
