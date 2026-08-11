import { ProjectCard } from "@/components/sections/projects/project-card";
import { FilterGrid, type FilterGridItem } from "@/components/ui/filter-grid";
import { Section } from "@/components/ui/section";
import { Heading, Mono } from "@/components/ui/typography";
import { projectsSection } from "@/lib/content";
import { getProjectCards } from "@/sanity/lib/loaders";

export async function Projects() {
  const { index, eyebrow, heading } = projectsSection;
  const projects = await getProjectCards();

  // "All" plus the unique categories present — derived, never duplicated.
  const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

  // Cards are Server Components rendered here; only their nodes cross into the client filter.
  const items: FilterGridItem[] = projects.map((project, projectIndex) => ({
    id: project.slug,
    category: project.category,
    node: <ProjectCard project={project} index={projectIndex} />,
  }));

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

        <FilterGrid
          categories={categories}
          items={items}
          filterLabel="Filter projects by category"
          emptyTitle="— No projects in this category"
          itemNoun="project"
        />
      </div>
    </Section>
  );
}
