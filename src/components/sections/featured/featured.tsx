import { FeaturedCover } from "@/components/sections/featured/featured-cover";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { Heading, Mono, Text } from "@/components/ui/typography";
import { featuredSection } from "@/lib/content";
import { ArrowRight, ArrowUpRight } from "@/lib/icons";
import { getFeaturedProject } from "@/sanity/lib/loaders";

export async function Featured() {
  const project = await getFeaturedProject();
  if (!project) return null;

  const { index, eyebrow } = featuredSection;
  const { title, outcome, description, year, role, technologies, image, links } = project;

  return (
    <Section id="work" reveal aria-labelledby="featured-heading">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="order-2 flex flex-col gap-6 lg:order-1 lg:col-span-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Mono tone="accent">{index}</Mono>
            <span aria-hidden className="text-muted-foreground">
              —
            </span>
            <Mono tone="muted">{eyebrow}</Mono>
            <span aria-hidden className="text-border">
              |
            </span>
            <Mono tone="muted">{year}</Mono>
          </div>

          <Heading id="featured-heading" as="h2" size="display-l" gradient>
            {title}
          </Heading>

          <Text size="body-l">{outcome}</Text>
          <Text size="body-m" tone="muted" className="max-w-xl">
            {description}
          </Text>

          <div className="flex flex-col gap-3">
            <Mono tone="muted">{role}</Mono>
            <ul className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {links.caseStudy ? (
              <Button asChild size="lg">
                <a href={links.caseStudy}>
                  Case study
                  <Icon icon={ArrowRight} />
                </a>
              </Button>
            ) : null}
            {links.live ? (
              <Button asChild variant="secondary" size="lg">
                <a href={links.live} target="_blank" rel="noopener noreferrer">
                  Live demo
                  <Icon icon={ArrowUpRight} />
                </a>
              </Button>
            ) : null}
            {links.github ? (
              <Button asChild variant="ghost" size="lg">
                <a href={links.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon />
                  GitHub
                </a>
              </Button>
            ) : null}
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6">
          <FeaturedCover image={image} />
        </div>
      </div>
    </Section>
  );
}
