/**
 * Central configuration + pure helpers for the Engineering Footprint section.
 * No network here (that lives in footprint.server.ts) so this stays unit-testable.
 */

export const engineeringProfiles = {
  github: {
    username: "sayandeep-adhikary",
    url: "https://github.com/sayandeep-adhikary",
  },
  leetcode: {
    username: "sayandeepadhikary2003",
    url: "https://leetcode.com/u/sayandeepadhikary2003/",
    focus: ["C++", "Data Structures", "Algorithms"] as readonly string[],
  },
} as const;

export type ContributionDay = { date: string; count: number };
export type ContributionWeek = { days: ContributionDay[] };

export type GithubStats = {
  username: string;
  url: string;
  publicRepos?: number;
  totalContributions?: number;
  weeks?: ContributionWeek[];
};

export type LeetCodeStats = {
  username: string;
  url: string;
  focus: readonly string[];
  total?: number;
  easy?: number;
  medium?: number;
  hard?: number;
};

export function githubFallback(): GithubStats {
  return { username: engineeringProfiles.github.username, url: engineeringProfiles.github.url };
}

export function leetCodeFallback(): LeetCodeStats {
  return {
    username: engineeringProfiles.leetcode.username,
    url: engineeringProfiles.leetcode.url,
    focus: engineeringProfiles.leetcode.focus,
  };
}

/** Grouped, human-readable count (e.g. 743 → "743", 1234 → "1,234"). */
export function formatCount(value: number): string {
  return value.toLocaleString("en-US");
}

/** Maps a day's count to a 0–4 intensity relative to the busiest day in view. */
export function contributionLevel(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (max <= 0) return 1;
  const ratio = count / max;
  if (ratio > 0.66) return 4;
  if (ratio > 0.33) return 3;
  if (ratio > 0.12) return 2;
  return 1;
}

export function recentWeeks(weeks: ContributionWeek[], count: number): ContributionWeek[] {
  return weeks.slice(-count);
}

export function maxDayCount(weeks: ContributionWeek[]): number {
  let max = 0;
  for (const week of weeks) {
    for (const day of week.days) {
      if (day.count > max) max = day.count;
    }
  }
  return max;
}

type LeetCodeSubmission = { difficulty?: string; count?: number };

/** Extracts total/easy/medium/hard from LeetCode's acSubmissionNum array, defensively. */
export function parseLeetCodeStats(
  submissions: LeetCodeSubmission[] | null | undefined,
): Pick<LeetCodeStats, "total" | "easy" | "medium" | "hard"> {
  const stats: Pick<LeetCodeStats, "total" | "easy" | "medium" | "hard"> = {};
  if (!Array.isArray(submissions)) return stats;
  for (const item of submissions) {
    if (!item || typeof item.count !== "number") continue;
    switch (item.difficulty) {
      case "All":
        stats.total = item.count;
        break;
      case "Easy":
        stats.easy = item.count;
        break;
      case "Medium":
        stats.medium = item.count;
        break;
      case "Hard":
        stats.hard = item.count;
        break;
    }
  }
  return stats;
}

type ContributionCalendar = {
  totalContributions?: number;
  weeks?: { contributionDays?: { date?: string; contributionCount?: number }[] }[];
};

/** Normalizes GitHub's GraphQL contribution calendar into the local shape, defensively. */
export function parseContributionCalendar(
  calendar: ContributionCalendar | null | undefined,
): Pick<GithubStats, "totalContributions" | "weeks"> {
  if (!calendar) return {};
  const weeks = Array.isArray(calendar.weeks)
    ? calendar.weeks.map((week) => ({
        days: (week.contributionDays ?? []).map((day) => ({
          date: day.date ?? "",
          count: typeof day.contributionCount === "number" ? day.contributionCount : 0,
        })),
      }))
    : undefined;
  return {
    totalContributions:
      typeof calendar.totalContributions === "number" ? calendar.totalContributions : undefined,
    weeks,
  };
}
