import { describe, expect, it } from "vitest";

import {
  contributionLevel,
  engineeringProfiles,
  formatCount,
  githubFallback,
  leetCodeFallback,
  maxDayCount,
  parseContributionCalendar,
  parseLeetCodeStats,
  recentWeeks,
  type ContributionWeek,
} from "@/lib/footprint";

describe("fallbacks", () => {
  it("GitHub fallback exposes only the profile, no stats", () => {
    const fb = githubFallback();
    expect(fb.username).toBe(engineeringProfiles.github.username);
    expect(fb.url).toBe(engineeringProfiles.github.url);
    expect(fb.publicRepos).toBeUndefined();
    expect(fb.totalContributions).toBeUndefined();
    expect(fb.weeks).toBeUndefined();
  });

  it("LeetCode fallback exposes profile + focus, no numeric stats", () => {
    const fb = leetCodeFallback();
    expect(fb.url).toBe(engineeringProfiles.leetcode.url);
    expect(fb.focus.length).toBeGreaterThan(0);
    expect(fb.total).toBeUndefined();
  });
});

describe("formatCount", () => {
  it("groups large numbers", () => {
    expect(formatCount(743)).toBe("743");
    expect(formatCount(1234)).toBe("1,234");
  });
});

describe("contributionLevel", () => {
  it("returns 0 for no contributions", () => {
    expect(contributionLevel(0, 10)).toBe(0);
  });
  it("scales with intensity relative to the max", () => {
    expect(contributionLevel(1, 10)).toBe(1);
    expect(contributionLevel(2, 10)).toBe(2);
    expect(contributionLevel(5, 10)).toBe(3);
    expect(contributionLevel(9, 10)).toBe(4);
  });
  it("handles a zero max without dividing by zero", () => {
    expect(contributionLevel(3, 0)).toBe(1);
  });
});

describe("recentWeeks / maxDayCount", () => {
  const weeks: ContributionWeek[] = Array.from({ length: 30 }, (_, w) => ({
    days: Array.from({ length: 7 }, (_, d) => ({ date: `w${w}-${d}`, count: (w + d) % 5 })),
  }));

  it("keeps only the most recent weeks", () => {
    const recent = recentWeeks(weeks, 17);
    expect(recent).toHaveLength(17);
    expect(recent[0]).toEqual(weeks[13]);
  });

  it("finds the busiest day", () => {
    expect(maxDayCount(weeks)).toBe(4);
    expect(maxDayCount([])).toBe(0);
  });
});

describe("parseLeetCodeStats", () => {
  it("maps difficulties to fields", () => {
    const result = parseLeetCodeStats([
      { difficulty: "All", count: 700 },
      { difficulty: "Easy", count: 300 },
      { difficulty: "Medium", count: 320 },
      { difficulty: "Hard", count: 80 },
    ]);
    expect(result).toEqual({ total: 700, easy: 300, medium: 320, hard: 80 });
  });

  it("returns an empty object for missing or invalid data", () => {
    expect(parseLeetCodeStats(null)).toEqual({});
    expect(parseLeetCodeStats(undefined)).toEqual({});
    expect(parseLeetCodeStats([{ difficulty: "Easy" }])).toEqual({});
  });
});

describe("parseContributionCalendar", () => {
  it("normalizes weeks and total", () => {
    const result = parseContributionCalendar({
      totalContributions: 12,
      weeks: [{ contributionDays: [{ date: "2024-01-01", contributionCount: 3 }] }],
    });
    expect(result.totalContributions).toBe(12);
    expect(result.weeks).toEqual([{ days: [{ date: "2024-01-01", count: 3 }] }]);
  });

  it("degrades gracefully for missing data", () => {
    expect(parseContributionCalendar(null)).toEqual({});
    expect(parseContributionCalendar({}).weeks).toBeUndefined();
  });
});
