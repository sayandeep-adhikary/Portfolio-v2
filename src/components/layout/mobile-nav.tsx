"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { Menu } from "@/lib/icons";
import type { NavItem } from "@/lib/navigation";

// Radix Dialog (~focus-trap panel) is only needed after the menu is opened,
// so it is code-split out of the initial bundle and loaded on first interaction.
const MobileNavDialog = dynamic(() => import("@/components/layout/mobile-nav-dialog"), {
  ssr: false,
});

const triggerClasses =
  "inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function MobileNav({ items, primaryAction }: { items: NavItem[]; primaryAction: NavItem }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`${triggerClasses} md:hidden`}
        onClick={() => {
          setMounted(true);
          setOpen(true);
        }}
      >
        <Icon icon={Menu} className="size-5" />
      </button>

      {mounted ? (
        <MobileNavDialog
          open={open}
          onOpenChange={setOpen}
          items={items}
          primaryAction={primaryAction}
        />
      ) : null}
    </>
  );
}
