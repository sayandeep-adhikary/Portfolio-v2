import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FeaturedCover } from "@/components/sections/featured/featured-cover";
import { ProjectGallery } from "@/components/sections/project/project-gallery";
import { ProjectNav } from "@/components/sections/project/project-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Glow } from "@/components/ui/glow";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { Container } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { Heading, Mono, Text } from "@/components/ui/typography";
import { ArrowLeft, ArrowUpRight } from "@/lib/icons";
import { siteConfig } from "@/lib/site";
import { getAdjacentProjects, getAllProjectSlugs, getProjectBySlug } from "@/sanity/lib/loaders";

type PageParams = { slug: string };

export async function generateStaticParams(): Promise<PageParams[]> {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  const url = `/work/${project.slug}`;
  const images = project.image
    ? [
        {
          url: project.image.src,
          width: project.image.width,
          height: project.image.height,
          alt: project.image.alt,
        },
      ]
    : undefined;

  return {
    // Plain string title inherits the root "%s — Portfolio" template.
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.description,
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const { previous, next } = await getAdjacentProjects(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${siteConfig.url}/work/${project.slug}`,
    dateCreated: project.year,
    keywords: project.technologies.join(", "),
    author: { "@type": "Person", name: siteConfig.name },
  };

  return (
    <article>
      <JsonLd data={jsonLd} />

      <Container className="relative isolate flex flex-col gap-12 overflow-x-clip py-16 md:gap-16 md:py-24">
        <Glow className="top-[-3rem] right-[-6rem] h-[22rem] w-[22rem] opacity-40" />
        <header className="flex flex-col gap-6">
          <Link
            href="/#projects"
            variant="plain"
            className="text-body-s text-muted-foreground hover:text-foreground inline-flex w-fit items-center gap-2 transition-colors"
          >
            <Icon icon={ArrowLeft} className="size-3.5" />
            Selected work
          </Link>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Mono tone="accent">{project.category}</Mono>
              <span aria-hidden className="text-border">
                |
              </span>
              <Mono tone="muted">{project.year}</Mono>
              <span aria-hidden className="text-border">
                |
              </span>
              <Mono tone="muted">{project.role}</Mono>
            </div>
            <Heading as="h1" size="display-l" gradient>
              {project.title}
            </Heading>
            <Text size="body-l" className="max-w-2xl">
              {project.outcome}
            </Text>
          </div>

          {project.links.live || project.links.github ? (
            <div className="flex flex-wrap items-center gap-3">
              {project.links.live ? (
                <Button asChild size="lg">
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                    Live demo
                    <Icon icon={ArrowUpRight} />
                  </a>
                </Button>
              ) : null}
              {project.links.github ? (
                <Button asChild variant="secondary" size="lg">
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <GithubIcon />
                    GitHub
                  </a>
                </Button>
              ) : null}
            </div>
          ) : null}
        </header>

        {/* Cover — the LCP of this route. */}
        <FeaturedCover image={project.image} priority />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-12 lg:col-span-8">
            <section className="flex flex-col gap-4">
              <Heading as="h2" size="heading-m">
                Overview
              </Heading>
              <Text size="body-m" tone="muted" className="max-w-2xl">
                {project.overview}
              </Text>
            </section>

            <section className="flex flex-col gap-4">
              <Heading as="h2" size="heading-m">
                Architecture
              </Heading>
              <Text size="body-m" tone="muted" className="max-w-2xl">
                {project.architecture}
              </Text>
            </section>

            {project.challenges.length > 0 ? (
              <section className="flex flex-col gap-4">
                <Heading as="h2" size="heading-m">
                  Challenges
                </Heading>
                <ul className="flex flex-col gap-3">
                  {project.challenges.map((item) => (
                    <li key={item} className="text-body-m text-muted-foreground flex gap-3">
                      <span aria-hidden className="bg-border mt-2 size-1.5 shrink-0 rounded-full" />
                      <span className="max-w-2xl">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {project.lessons.length > 0 ? (
              <section className="flex flex-col gap-4">
                <Heading as="h2" size="heading-m">
                  Lessons learned
                </Heading>
                <ul className="flex flex-col gap-3">
                  {project.lessons.map((item) => (
                    <li key={item} className="text-body-m text-foreground flex gap-3">
                      <span
                        aria-hidden
                        className="bg-primary mt-2 size-1.5 shrink-0 rounded-full"
                      />
                      <span className="max-w-2xl">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="flex flex-col gap-4">
              <Heading as="h2" size="heading-m">
                Gallery
              </Heading>
              <ProjectGallery images={project.gallery} />
            </section>
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-card border-border bg-card flex flex-col gap-6 border p-6 lg:sticky lg:top-[calc(var(--header-height)+1.5rem)]">
              <div className="flex flex-col gap-4">
                <Mono tone="muted">At a glance</Mono>
                <dl className="text-body-s flex flex-col gap-3">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Role</dt>
                    <dd className="text-foreground text-right font-medium">{project.role}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Year</dt>
                    <dd className="text-foreground text-right font-medium">{project.year}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Category</dt>
                    <dd className="text-foreground text-right font-medium">{project.category}</dd>
                  </div>
                </dl>
              </div>

              <Divider />

              <div className="flex flex-col gap-3">
                <Mono tone="muted">Tech stack</Mono>
                <ul className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li key={tech}>
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <Divider />

        <ProjectNav previous={previous} next={next} />
      </Container>
    </article>
  );
}
