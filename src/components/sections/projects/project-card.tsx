import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Tag } from "@/components/ui/tag";
import { Heading, Mono, Text } from "@/components/ui/typography";
import { ArrowRight } from "@/lib/icons";
import type { ProjectCardData } from "@/types/content";

const MAX_TAGS = 4;

export function ProjectCard({ project, index }: { project: ProjectCardData; index: number }) {
  const href = project.links.caseStudy ?? project.links.live ?? project.links.github ?? "#";
  const { image } = project;

  return (
    <a
      href={href}
      aria-label={`${project.title} — ${project.category}`}
      className="group rounded-card focus-visible:ring-ring focus-visible:ring-offset-background block h-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <Card
        variant="interactive"
        padding="none"
        className="group-focus-visible:border-foreground/15 group-focus-visible:shadow-soft flex h-full flex-col overflow-hidden"
      >
        <div className="border-border bg-muted relative aspect-[16/10] overflow-hidden border-b">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              placeholder={image.blurDataURL ? "blur" : "empty"}
              blurDataURL={image.blurDataURL}
              className="object-cover transition-[filter,scale] duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.03] group-hover:brightness-105"
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--muted-foreground)_8%,transparent),transparent)]"
            >
              <span className="text-muted-foreground/40 font-mono text-2xl">◆</span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-center justify-between gap-3">
            <Badge variant="outline">{project.category}</Badge>
            <Mono tone="muted">{String(index + 1).padStart(2, "0")}</Mono>
          </div>

          <div className="flex items-start justify-between gap-3">
            <Heading as="h3" size="heading-s">
              {project.title}
            </Heading>
            <Icon
              icon={ArrowRight}
              className="text-muted-foreground mt-1 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
            />
          </div>

          <Text size="body-s" tone="muted" className="line-clamp-2">
            {project.description}
          </Text>

          <ul className="mt-auto flex flex-wrap gap-2 pt-2">
            {project.technologies.slice(0, MAX_TAGS).map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </a>
  );
}
