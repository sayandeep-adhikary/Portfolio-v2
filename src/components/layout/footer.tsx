import { Brand } from "@/components/layout/brand";
import { SocialLinks } from "@/components/sections/social-links";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Divider } from "@/components/ui/divider";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { Container } from "@/components/ui/section";
import { Mono, Text } from "@/components/ui/typography";
import { ArrowUp } from "@/lib/icons";
import { navItems, navPrimaryAction } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";
import { getSocialLinks } from "@/sanity/lib/loaders";

export async function Footer() {
  // Rendered on the server — no client Date, no hydration risk.
  const year = new Date().getFullYear();
  const footerLinks = [...navItems, navPrimaryAction];
  const socialLinks = await getSocialLinks();

  return (
    <footer className="border-border border-t">
      <Container className="flex flex-col gap-10 py-12 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <Brand />
            <Text size="body-s" tone="muted" className="max-w-xs">
              {siteConfig.description}
            </Text>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                variant="plain"
                className="text-body-s text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Divider />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <Mono tone="muted">
              © {year} {siteConfig.name}
            </Mono>
            <Mono tone="muted">Built with Next.js &amp; Sanity</Mono>
          </div>

          <div className="flex items-center gap-3">
            <SocialLinks links={socialLinks} />
            <ThemeToggle />
            <a
              href="#top"
              aria-label="Back to top"
              className="border-border text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex size-10 items-center justify-center rounded-md border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <Icon icon={ArrowUp} className="size-[18px]" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
