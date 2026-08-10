import { Brand } from "@/components/layout/brand";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { HeaderShell } from "@/components/layout/header-shell";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { navItems, navPrimaryAction } from "@/lib/navigation";

export function SiteHeader() {
  return (
    <HeaderShell>
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Brand />
          <DesktopNav items={navItems} />
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="secondary" size="sm" className="hidden sm:inline-flex">
            <a href={navPrimaryAction.href}>{navPrimaryAction.label}</a>
          </Button>
          <MobileNav items={navItems} primaryAction={navPrimaryAction} />
        </div>
      </Container>
    </HeaderShell>
  );
}
