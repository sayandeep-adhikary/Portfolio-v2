import "server-only";

import { sanityFetch } from "@/sanity/lib/fetch";
import {
  aboutQuery,
  achievementsQuery,
  allProjectsNavQuery,
  certificationsQuery,
  contactQuery,
  currentStatusQuery,
  experienceQuery,
  featuredProjectQuery,
  heroQuery,
  projectBySlugQuery,
  projectCardsQuery,
  projectSlugsQuery,
  skillsQuery,
  socialLinksQuery,
} from "@/sanity/queries";
import {
  aboutContent,
  achievementsContent,
  certificationsContent,
  contactContent,
  currentStatus,
  experienceContent,
  heroContent,
  skillsContent,
  socialLinks,
} from "@/lib/content";
import {
  getAllProjectCards,
  getAllProjectSlugs as localProjectSlugs,
  getFeaturedProject as localFeaturedProject,
  getProjectBySlug as localProjectBySlug,
  getProjectCards as localProjectCards,
  type AdjacentProjects,
} from "@/lib/projects";
import type {
  AboutContent,
  AchievementsContent,
  CertificationsContent,
  ContactContent,
  CurrentStatus,
  ExperienceContent,
  HeroContent,
  ProjectCardData,
  ProjectDetail,
  SkillsContent,
  SocialLink,
} from "@/types/content";

/**
 * Typed content loaders. Each wraps `sanityFetch` with a local `fallback`, so
 * the site renders identically whether or not a Sanity project is configured.
 * Cache tags are granular per content type to enable targeted revalidation.
 */

export function getHero(): Promise<HeroContent> {
  return sanityFetch<HeroContent>({
    query: heroQuery,
    tags: ["hero"],
    fallback: heroContent,
  });
}

export function getCurrentStatus(): Promise<CurrentStatus> {
  return sanityFetch<CurrentStatus>({
    query: currentStatusQuery,
    tags: ["currentStatus"],
    fallback: currentStatus,
  });
}

export function getSocialLinks(): Promise<SocialLink[]> {
  return sanityFetch<SocialLink[]>({
    query: socialLinksQuery,
    tags: ["socialLink"],
    fallback: socialLinks,
  });
}

export function getAbout(): Promise<AboutContent> {
  return sanityFetch<AboutContent>({
    query: aboutQuery,
    tags: ["about"],
    fallback: aboutContent,
  });
}

export function getSkills(): Promise<SkillsContent> {
  return sanityFetch<SkillsContent>({
    query: skillsQuery,
    tags: ["skills"],
    fallback: skillsContent,
  });
}

export function getExperience(): Promise<ExperienceContent> {
  return sanityFetch<ExperienceContent>({
    query: experienceQuery,
    tags: ["experience"],
    fallback: experienceContent,
  });
}

export function getCertifications(): Promise<CertificationsContent> {
  return sanityFetch<CertificationsContent>({
    query: certificationsQuery,
    tags: ["certifications"],
    fallback: certificationsContent,
  });
}

export function getAchievements(): Promise<AchievementsContent> {
  return sanityFetch<AchievementsContent>({
    query: achievementsQuery,
    tags: ["achievements"],
    fallback: achievementsContent,
  });
}

export function getContact(): Promise<ContactContent> {
  return sanityFetch<ContactContent>({
    query: contactQuery,
    tags: ["contact"],
    fallback: contactContent,
  });
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                   */
/* -------------------------------------------------------------------------- */

export function getFeaturedProject(): Promise<ProjectDetail | null> {
  return sanityFetch<ProjectDetail | null>({
    query: featuredProjectQuery,
    tags: ["project"],
    fallback: localFeaturedProject() ?? null,
  });
}

export function getProjectCards(): Promise<ProjectCardData[]> {
  return sanityFetch<ProjectCardData[]>({
    query: projectCardsQuery,
    tags: ["project"],
    fallback: localProjectCards(),
  });
}

export function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  return sanityFetch<ProjectDetail | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: ["project", `project:${slug}`],
    fallback: localProjectBySlug(slug) ?? null,
  });
}

export function getAllProjectSlugs(): Promise<string[]> {
  return sanityFetch<string[]>({
    query: projectSlugsQuery,
    tags: ["project"],
    fallback: localProjectSlugs(),
  });
}

export async function getAdjacentProjects(slug: string): Promise<AdjacentProjects> {
  const cards = await sanityFetch<ProjectCardData[]>({
    query: allProjectsNavQuery,
    tags: ["project"],
    fallback: getAllProjectCards(),
  });

  const index = cards.findIndex((card) => card.slug === slug);
  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? (cards[index - 1] ?? null) : null,
    next: index < cards.length - 1 ? (cards[index + 1] ?? null) : null,
  };
}
