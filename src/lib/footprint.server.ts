import "server-only";

import {
  engineeringProfiles,
  githubFallback,
  leetCodeFallback,
  parseContributionCalendar,
  parseLeetCodeStats,
  type GithubStats,
  type LeetCodeStats,
} from "@/lib/footprint";

// Stats change slowly; refresh a few times a day and never block on the network.
const REVALIDATE_SECONDS = 21_600; // 6 hours
const TIMEOUT_MS = 4_000;

type GithubGraphqlResponse = {
  data?: {
    user?: {
      repositories?: { totalCount?: number };
      contributionsCollection?: {
        contributionCalendar?: Parameters<typeof parseContributionCalendar>[0];
      };
    } | null;
  };
};

type LeetCodeResponse = {
  data?: {
    matchedUser?: {
      submitStatsGlobal?: {
        acSubmissionNum?: Parameters<typeof parseLeetCodeStats>[0];
      };
    } | null;
  };
};

export async function getGithubStats(): Promise<GithubStats> {
  const base = githubFallback();
  const token = process.env.GITHUB_TOKEN;

  try {
    // With a server-only token, the official GraphQL API returns repos + the
    // contribution calendar (the graph is not available unauthenticated).
    if (token) {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          query:
            "query($login:String!){user(login:$login){repositories(privacy:PUBLIC){totalCount} contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount}}}}}}",
          variables: { login: engineeringProfiles.github.username },
        }),
        next: { revalidate: REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!res.ok) return base;
      const json = (await res.json()) as GithubGraphqlResponse;
      const user = json.data?.user;
      if (!user) return base;
      const calendar = parseContributionCalendar(
        user.contributionsCollection?.contributionCalendar,
      );
      return {
        ...base,
        publicRepos:
          typeof user.repositories?.totalCount === "number"
            ? user.repositories.totalCount
            : undefined,
        totalContributions: calendar.totalContributions,
        weeks: calendar.weeks,
      };
    }

    // Unauthenticated fallback: public repo count only.
    const res = await fetch(`https://api.github.com/users/${engineeringProfiles.github.username}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return base;
    const json = (await res.json()) as { public_repos?: number };
    return {
      ...base,
      publicRepos: typeof json.public_repos === "number" ? json.public_repos : undefined,
    };
  } catch {
    return base;
  }
}

export async function getLeetCodeStats(): Promise<LeetCodeStats> {
  const base = leetCodeFallback();
  const username: string = engineeringProfiles.leetcode.username;
  if (!username) return base;

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (portfolio engineering-footprint)",
      },
      body: JSON.stringify({
        query:
          "query($username:String!){matchedUser(username:$username){submitStatsGlobal{acSubmissionNum{difficulty count}}}}",
        variables: { username },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return base;
    const json = (await res.json()) as LeetCodeResponse;
    const submissions = json.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
    return { ...base, ...parseLeetCodeStats(submissions) };
  } catch {
    return base;
  }
}
