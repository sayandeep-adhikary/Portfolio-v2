import type { ProjectCardData, ProjectDetail } from "@/types/content";

/**
 * Canonical project source — mirrors the future Sanity `project` collection.
 * The grid, featured section, and detail pages all derive from this single list,
 * so there is no duplicated project data. Order defines prev/next.
 */
export const projects: ProjectDetail[] = [
  {
    slug: "northwind-design-platform",
    title: "Northwind Design Platform",
    description:
      "A collaborative design-tooling platform where teams build, theme, and ship interfaces together.",
    category: "Web App",
    year: "2024",
    role: "Lead Frontend Engineer",
    outcome: "Rebuilt the core editor and cut median load time by 42%.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity"],
    image: null,
    gallery: [],
    orderNumber: 1,
    overview:
      "Northwind lets product teams design, theme, and ship interfaces from one place. I led the frontend rebuild, moving a heavy client-rendered app to a streaming, Server-Component architecture.",
    architecture:
      "The app is a Next.js App Router project with a tokenized design system at its core. Editor state is isolated into small client islands, while everything else renders on the server and streams. Content and presets are modeled in a headless CMS and cached with tag-based revalidation.",
    challenges: [
      "The legacy editor re-rendered the entire canvas on every keystroke; I isolated state into focused islands to keep interactions under 16ms.",
      "Theming needed to stay contrast-safe across thousands of user combinations, so I constrained it to a validated token allowlist.",
    ],
    lessons: [
      "Server Components pay off most when client boundaries are drawn deliberately and kept small.",
      "Performance budgets only hold when they're enforced automatically in CI.",
    ],
    links: {
      live: "https://example.com",
      github: "https://github.com/username/northwind",
      caseStudy: "/work/northwind-design-platform",
    },
    featured: true,
  },
  {
    slug: "atlas-analytics",
    title: "Atlas Analytics",
    description: "A real-time analytics dashboard handling millions of events per day.",
    category: "Web App",
    year: "2024",
    role: "Frontend Engineer",
    outcome: "Delivered a real-time dashboard that stays responsive at scale.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    image: null,
    gallery: [],
    orderNumber: 2,
    overview:
      "Atlas turns a firehose of product events into live, explorable dashboards. The challenge was keeping the UI fluid while ingesting millions of events a day.",
    architecture:
      "A streaming data layer feeds server-rendered views, with virtualized tables and incremental hydration for the interactive charts. Aggregations run in Postgres, cached at the edge.",
    challenges: [
      "Rendering tens of thousands of rows without jank required windowing and careful memoization.",
      "Live updates had to reconcile with cached aggregates without flickering.",
    ],
    lessons: [
      "Virtualization plus server aggregation beats shipping raw data to the client.",
      "Perceived performance is mostly about avoiding layout shifts under load.",
    ],
    links: { live: "https://example.com", caseStudy: "/work/atlas-analytics" },
  },
  {
    slug: "meridian",
    title: "Meridian",
    description: "A marketing site with a headless CMS and sub-second loads worldwide.",
    category: "Website",
    year: "2023",
    role: "Frontend Engineer",
    outcome: "Shipped a global marketing site with sub-second loads.",
    technologies: ["Next.js", "Sanity", "Tailwind CSS"],
    image: null,
    gallery: [],
    orderNumber: 3,
    overview:
      "Meridian is a fully editable marketing site where the content team owns every section. I built the block system and the performance foundation.",
    architecture:
      "Static generation with on-demand revalidation from CMS webhooks. Every section is a typed, composable block, and images are optimized and served from the CMS CDN.",
    challenges: [
      "Giving editors flexibility without letting layouts drift from the design system.",
      "Keeping Largest Contentful Paint low on image-heavy hero sections.",
    ],
    lessons: [
      "Constrain the page builder to curated blocks, not free-form layout.",
      "A tight image contract is the single biggest LCP lever.",
    ],
    links: { live: "https://example.com", caseStudy: "/work/meridian" },
  },
  {
    slug: "prism-ui",
    title: "Prism UI",
    description: "An open-source, accessible React component library with theming.",
    category: "Open Source",
    year: "2023",
    role: "Maintainer",
    outcome: "Grew an accessible component library to thousands of installs.",
    technologies: ["React", "TypeScript", "Radix"],
    image: null,
    gallery: [],
    orderNumber: 4,
    overview:
      "Prism is an accessible, themeable React component library built on unstyled primitives. It focuses on keyboard support and predictable APIs.",
    architecture:
      "Composable components on top of Radix primitives, with a token-driven theme layer and full TypeScript inference. Docs are generated from the source.",
    challenges: [
      "Designing APIs that stayed simple while covering real accessibility edge cases.",
      "Keeping bundle size low despite a broad component surface.",
    ],
    lessons: [
      "Accessibility is easier when you build on well-tested primitives.",
      "Great DX comes from strong types, not more options.",
    ],
    links: { github: "https://github.com/username/prism-ui", caseStudy: "/work/prism-ui" },
  },
  {
    slug: "forge-cli",
    title: "Forge CLI",
    description: "A developer CLI that scaffolds production-ready projects in seconds.",
    category: "Tooling",
    year: "2022",
    role: "Creator",
    outcome: "Cut project setup from hours to seconds for a whole team.",
    technologies: ["Node.js", "TypeScript"],
    image: null,
    gallery: [],
    orderNumber: 5,
    overview:
      "Forge scaffolds opinionated, production-ready projects — linting, testing, CI, and deploy config included — from a single command.",
    architecture:
      "A plugin-based generator with composable templates and interactive prompts, distributed as a small, dependency-light npm package.",
    challenges: [
      "Keeping templates current as best practices evolved.",
      "Making prompts fast and non-blocking on slow machines.",
    ],
    lessons: [
      "Good defaults remove more friction than configuration options.",
      "A tool that saves minutes daily earns adoption quickly.",
    ],
    links: { github: "https://github.com/username/forge", caseStudy: "/work/forge-cli" },
  },
  {
    slug: "cadence",
    title: "Cadence",
    description: "A habit-tracking app with offline-first sync and delightful interactions.",
    category: "Web App",
    year: "2022",
    role: "Frontend Engineer",
    outcome: "Built an offline-first app that syncs seamlessly across devices.",
    technologies: ["React", "IndexedDB", "Vite"],
    image: null,
    gallery: [],
    orderNumber: 6,
    overview:
      "Cadence helps people build habits with a fast, offline-first experience that syncs the moment a connection returns.",
    architecture:
      "Local-first data in IndexedDB with a background sync engine that resolves conflicts deterministically. The UI stays optimistic and never blocks on the network.",
    challenges: [
      "Conflict resolution across devices editing the same data offline.",
      "Keeping the optimistic UI honest when a sync eventually failed.",
    ],
    lessons: [
      "Local-first design makes apps feel instant, but demands a real conflict strategy.",
      "Optimistic UI needs a clear, reversible failure path.",
    ],
    links: { caseStudy: "/work/cadence" },
  },
  {
    slug: "studio-folio",
    title: "Studio Folio",
    description: "A portfolio platform template for design studios, sold to 200+ teams.",
    category: "Website",
    year: "2021",
    role: "Creator",
    outcome: "Launched a template adopted by 200+ studios.",
    technologies: ["Next.js", "Tailwind CSS"],
    image: null,
    gallery: [],
    orderNumber: 7,
    overview:
      "Studio Folio is a polished, customizable portfolio template for design studios, built to be fast out of the box and easy to theme.",
    architecture:
      "A statically generated Next.js template with a small theming layer and content-driven sections, optimized for Core Web Vitals from the first commit.",
    challenges: [
      "Balancing customizability with a curated, hard-to-break design.",
      "Documenting theming so non-developers could adapt it.",
    ],
    lessons: [
      "Templates succeed when they're opinionated yet approachable.",
      "Clear docs are a feature, not an afterthought.",
    ],
    links: { live: "https://example.com", caseStudy: "/work/studio-folio" },
  },
];

export function sortProjectsByOrder<T extends { slug: string; orderNumber?: number | null }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const aOrder = typeof a.orderNumber === "number" ? a.orderNumber : Number.MAX_SAFE_INTEGER;
    const bOrder = typeof b.orderNumber === "number" ? b.orderNumber : Number.MAX_SAFE_INTEGER;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    return a.slug.localeCompare(b.slug);
  });
}

const toCard = ({
  slug,
  title,
  description,
  category,
  year,
  technologies,
  image,
  links,
}: ProjectDetail): ProjectCardData => ({
  slug,
  title,
  description,
  category,
  year,
  technologies,
  image,
  links,
});

export function getFeaturedProject(): ProjectDetail | undefined {
  return projects.find((project) => project.featured);
}

/** Non-featured projects as card projections, for the grid. */
export function getProjectCards(): ProjectCardData[] {
  return sortProjectsByOrder(projects.filter((project) => !project.featured)).map(toCard);
}

/** All projects (incl. featured) as ordered card projections — used for prev/next. */
export function getAllProjectCards(): ProjectCardData[] {
  return sortProjectsByOrder(projects).map(toCard);
}

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

export type AdjacentProjects = {
  previous: ProjectCardData | null;
  next: ProjectCardData | null;
};

export function getAdjacentProjects(slug: string): AdjacentProjects {
  const orderedProjects = sortProjectsByOrder(projects);
  const currentIndex = orderedProjects.findIndex((project) => project.slug === slug);
  if (currentIndex === -1) return { previous: null, next: null };
  const previous = currentIndex > 0 ? orderedProjects[currentIndex - 1] : undefined;
  const next = currentIndex < orderedProjects.length - 1 ? orderedProjects[currentIndex + 1] : undefined;
  return {
    previous: previous ? toCard(previous) : null,
    next: next ? toCard(next) : null,
  };
}
