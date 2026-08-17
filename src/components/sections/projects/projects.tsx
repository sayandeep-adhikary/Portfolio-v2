import Link from "next/link";

import { ProjectCard } from "@/components/sections/projects/project-card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { Heading, Mono } from "@/components/ui/typography";
import { projectsSection } from "@/lib/content";
import { ArrowRight } from "@/lib/icons";
import { getProjectCards } from "@/sanity/lib/loaders";

// Keep the homepage tidy; the full, filterable list lives on /work.
const HOME_PROJECT_LIMIT = 6;

export async function Projects() {
  const { index, eyebrow, heading } = projectsSection;
  const projects = await getProjectCards();

  // Nothing to show — omit the section rather than render an empty grid.
  if (projects.length === 0) return null;

  const visible = projects.slice(0, HOME_PROJECT_LIMIT);
  const hasMore = projects.length > HOME_PROJECT_LIMIT;

  return (
    <Section id="projects" reveal glow="left" aria-labelledby="projects-heading">
      <div className="flex flex-col gap-10 md:gap-12">
        <header className="flex max-w-2xl flex-col gap-4">
          <div className="flex items-center gap-3">
            <Mono tone="accent">{index}</Mono>
            <span aria-hidden className="text-muted-foreground">
              —
            </span>
            <Mono tone="muted">{eyebrow}</Mono>
          </div>
          <Heading id="projects-heading" as="h2" size="display-l" gradient>
            {heading}
          </Heading>
        </header>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {visible.map((project, projectIndex) => (
            <li key={project.slug}>
              <ProjectCard project={project} index={projectIndex} />
            </li>
          ))}
        </ul>

        {hasMore ? (
          <div className="flex justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/work">
                View all projects
                <Icon icon={ArrowRight} />
              </Link>
            </Button>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
