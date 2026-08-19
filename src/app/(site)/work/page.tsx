import type { Metadata } from "next";

import { ProjectCard } from "@/components/sections/projects/project-card";
import { FilterGrid, type FilterGridItem } from "@/components/ui/filter-grid";
import { Glow } from "@/components/ui/glow";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { Container } from "@/components/ui/section";
import { Heading, Mono, Text } from "@/components/ui/typography";
import { ArrowLeft } from "@/lib/icons";
import { getAllProjects } from "@/sanity/lib/loaders";

export const metadata: Metadata = {
  title: "Projects",
  description: "The full collection of projects, ordered and filterable by focus.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const projects = await getAllProjects();

  // "All" plus the unique categories present — derived, never duplicated.
  const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

  const items: FilterGridItem[] = projects.map((project, projectIndex) => ({
    id: project.slug,
    category: project.category,
    node: <ProjectCard project={project} index={projectIndex} />,
  }));

  return (
    <div className="relative isolate overflow-x-clip">
      <Glow className="top-[-2rem] right-[-4rem] h-[16rem] w-[16rem] opacity-40 sm:right-[-5rem] sm:h-[20rem] sm:w-[20rem] md:top-[-4rem] md:right-[-7rem] md:h-[26rem] md:w-[26rem]" />
      <Container className="flex flex-col gap-12 py-16 md:gap-16 md:py-24">
        <header className="flex flex-col gap-6">
          <Link
            href="/#projects"
            variant="plain"
            className="text-body-s text-muted-foreground hover:text-foreground inline-flex w-fit items-center gap-2 transition-colors"
          >
            <Icon icon={ArrowLeft} className="size-3.5" />
            Back home
          </Link>

          <div className="flex flex-col gap-4">
            <Mono tone="accent">All work</Mono>
            <Heading as="h1" size="display-l" gradient>
              Everything I&apos;ve shipped.
            </Heading>
            <Text size="body-l" tone="muted" className="max-w-2xl">
              The full collection — ordered, and filterable by focus.
            </Text>
          </div>
        </header>

        <FilterGrid
          categories={categories}
          items={items}
          filterLabel="Filter projects by category"
          emptyTitle="— No projects in this category"
          itemNoun="project"
        />
      </Container>
    </div>
  );
}
