import { Link } from "@/components/ui/link";
import { siteConfig } from "@/lib/site";

export function Brand() {
  return (
    <Link
      href="/"
      variant="plain"
      aria-label={`${siteConfig.name}, home`}
      className="text-body-s text-foreground inline-flex items-center gap-1.5 font-mono font-medium tracking-tight"
    >
      <span
        aria-hidden
        className="bg-primary text-primary-foreground inline-flex h-5 w-5 items-center justify-center rounded-md text-[0.625rem] font-semibold tracking-tight"
      >
        SA
      </span>
      <span>{siteConfig.name.toLowerCase()}</span>
    </Link>
  );
}
