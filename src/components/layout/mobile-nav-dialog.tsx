"use client";

import * as Dialog from "@radix-ui/react-dialog";

import { Divider } from "@/components/ui/divider";
import { Icon } from "@/components/ui/icon";
import { Mono } from "@/components/ui/typography";
import { X } from "@/lib/icons";
import type { NavItem } from "@/lib/navigation";

const triggerClasses =
  "inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function MobileNavDialog({
  open,
  onOpenChange,
  items,
  primaryAction,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: NavItem[];
  primaryAction: NavItem;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-background/60 supports-[backdrop-filter]:bg-background/40 fixed inset-0 z-50 supports-[backdrop-filter]:backdrop-blur-sm" />
        <Dialog.Content className="bg-background shadow-soft fixed inset-y-0 right-0 z-50 flex h-dvh w-full max-w-sm flex-col p-6 focus:outline-none">
          <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>
          <Dialog.Description className="sr-only">
            Links to sections of the site.
          </Dialog.Description>

          <div className="flex items-center justify-between">
            <Mono>Menu</Mono>
            <Dialog.Close asChild>
              <button type="button" aria-label="Close menu" className={triggerClasses}>
                <Icon icon={X} className="size-5" />
              </button>
            </Dialog.Close>
          </div>

          <Divider className="my-6" />

          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {items.map((item, index) => (
              <Dialog.Close asChild key={item.href}>
                <a
                  href={item.href}
                  className="text-heading-s text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring flex items-baseline gap-3 rounded-md px-2 py-3 transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  <Mono tone="muted" className="w-6 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </Mono>
                  {item.label}
                </a>
              </Dialog.Close>
            ))}
          </nav>

          <div className="mt-auto">
            <Dialog.Close asChild>
              <a
                href={primaryAction.href}
                className="bg-primary text-body-s text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring focus-visible:ring-offset-background inline-flex h-11 w-full items-center justify-center rounded-lg px-5 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {primaryAction.label}
              </a>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
