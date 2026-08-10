import { describe, expect, it } from "vitest";

import {
  getAdjacentProjects,
  getAllProjectSlugs,
  getFeaturedProject,
  getProjectBySlug,
  getProjectCards,
  projects,
} from "@/lib/projects";

describe("projects data", () => {
  it("has unique slugs", () => {
    const slugs = getAllProjectSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("exposes exactly one featured project excluded from the grid", () => {
    const featured = getFeaturedProject();
    expect(featured?.featured).toBe(true);
    expect(getProjectCards().some((c) => c.slug === featured?.slug)).toBe(false);
  });

  it("resolves a project by slug and returns undefined for unknown", () => {
    expect(getProjectBySlug(projects[0]!.slug)?.slug).toBe(projects[0]!.slug);
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("getAdjacentProjects", () => {
  it("returns null neighbours at the boundaries", () => {
    const first = getAdjacentProjects(projects[0]!.slug);
    expect(first.previous).toBeNull();
    expect(first.next?.slug).toBe(projects[1]!.slug);

    const last = getAdjacentProjects(projects[projects.length - 1]!.slug);
    expect(last.next).toBeNull();
    expect(last.previous?.slug).toBe(projects[projects.length - 2]!.slug);
  });

  it("returns both neighbours for a middle project", () => {
    const middle = getAdjacentProjects(projects[1]!.slug);
    expect(middle.previous?.slug).toBe(projects[0]!.slug);
    expect(middle.next?.slug).toBe(projects[2]!.slug);
  });

  it("returns null neighbours for an unknown slug", () => {
    expect(getAdjacentProjects("nope")).toEqual({ previous: null, next: null });
  });
});
