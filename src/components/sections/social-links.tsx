import type { ComponentType, SVGProps } from "react";

import { GithubIcon, InstagramIcon, LinkedinIcon, MailIcon } from "@/components/ui/brand-icons";
import { Link } from "@/components/ui/link";
import type { SocialLink, SocialPlatform } from "@/types/content";
import { cn } from "@/lib/utils";

const PLATFORM_ICON: Partial<Record<SocialPlatform, ComponentType<SVGProps<SVGSVGElement>>>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  email: MailIcon,
};

export function SocialLinks({ links, className }: { links: SocialLink[]; className?: string }) {
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {links.map((link) => {
        const IconComponent = PLATFORM_ICON[link.platform];
        // Skip links with an unknown platform or empty URL (e.g. stale CMS data).
        if (!IconComponent || !link.href) return null;
        return (
          <li key={link.platform}>
            <Link
              href={link.href}
              variant="plain"
              aria-label={link.label}
              className="text-muted-foreground hover:bg-accent hover:text-foreground inline-flex size-10 items-center justify-center rounded-md transition-colors"
            >
              <IconComponent className="size-[18px]" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
