import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { Mono } from "@/components/ui/typography";
import { ArrowLeft, ArrowRight } from "@/lib/icons";
import type { AdjacentProjects } from "@/lib/projects";

const linkClasses =
  "group flex flex-col gap-1 rounded-card border border-border bg-card p-6 transition-colors hover:border-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ProjectNav({ previous, next }: AdjacentProjects) {
  return (
    <nav aria-label="Adjacent projects" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {previous ? (
        <Link href={`/work/${previous.slug}`} variant="plain" className={linkClasses}>
          <span className="flex items-center gap-2">
            <Icon
              icon={ArrowLeft}
              className="text-muted-foreground transition-transform duration-200 group-hover:-translate-x-1"
            />
            <Mono tone="muted">Previous</Mono>
          </span>
          <span className="text-body-m text-foreground font-medium">{previous.title}</span>
        </Link>
      ) : (
        <span aria-hidden />
      )}

      {next ? (
        <Link
          href={`/work/${next.slug}`}
          variant="plain"
          className={`${linkClasses} sm:items-end sm:text-right`}
        >
          <span className="flex items-center gap-2">
            <Mono tone="muted">Next</Mono>
            <Icon
              icon={ArrowRight}
              className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
          <span className="text-body-m text-foreground font-medium">{next.title}</span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
    </nav>
  );
}
