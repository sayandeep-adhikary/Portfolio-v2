import { ContributionHeatmap } from "@/components/sections/footprint/contribution-heatmap";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { Section } from "@/components/ui/section";
import { Heading, Mono, Text } from "@/components/ui/typography";
import { formatCount, type GithubStats, type LeetCodeStats } from "@/lib/footprint";
import { getGithubStats, getLeetCodeStats } from "@/lib/footprint.server";
import { ArrowUpRight } from "@/lib/icons";

const ctaClasses =
  "text-body-s text-foreground hover:text-primary inline-flex items-center gap-1.5 font-medium transition-colors";

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-mono-label text-muted-foreground font-mono uppercase">{label}</dt>
      <dd className="text-body-m text-foreground font-medium tabular-nums">{formatCount(value)}</dd>
    </div>
  );
}

function GithubPanel({ stats }: { stats: GithubStats }) {
  const { weeks, totalContributions, publicRepos, username, url } = stats;

  return (
    <Card className="flex h-full flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <Mono tone="muted">GitHub</Mono>
        <p className="text-heading-s text-foreground font-medium">{username}</p>
      </div>

      {weeks && weeks.length > 0 && typeof totalContributions === "number" ? (
        <div className="flex flex-col gap-3">
          <ContributionHeatmap weeks={weeks} />
          <Text size="body-s" tone="muted">
            {formatCount(totalContributions)} contributions in the last year
          </Text>
        </div>
      ) : null}

      {typeof publicRepos === "number" ? (
        <dl className="flex flex-col gap-2">
          <StatRow label="Public repositories" value={publicRepos} />
        </dl>
      ) : null}

      <div className="mt-auto">
        <Link href={url} variant="plain" className={ctaClasses}>
          View GitHub
          <Icon icon={ArrowUpRight} className="size-4" />
        </Link>
      </div>
    </Card>
  );
}

function LeetCodePanel({ stats }: { stats: LeetCodeStats }) {
  const { total, easy, medium, hard, focus, url } = stats;
  const rows = [
    { label: "Easy", value: easy },
    { label: "Medium", value: medium },
    { label: "Hard", value: hard },
  ].filter((row): row is { label: string; value: number } => typeof row.value === "number");

  return (
    <Card className="flex h-full flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <Mono tone="muted">LeetCode</Mono>
        <p className="text-heading-s text-foreground font-medium">Problem solving</p>
      </div>

      {typeof total === "number" ? (
        <div className="flex flex-col gap-1">
          <span className="text-heading-m text-foreground font-medium tabular-nums">
            {formatCount(total)}
          </span>
          <Text size="body-s" tone="muted">
            problems solved
          </Text>
        </div>
      ) : null}

      {rows.length > 0 ? (
        <dl className="flex flex-col gap-2">
          {rows.map((row) => (
            <StatRow key={row.label} label={row.label} value={row.value} />
          ))}
        </dl>
      ) : null}

      {focus.length > 0 ? <Mono tone="muted">{focus.join(" · ")}</Mono> : null}

      <div className="mt-auto">
        <Link href={url} variant="plain" className={ctaClasses}>
          View LeetCode
          <Icon icon={ArrowUpRight} className="size-4" />
        </Link>
      </div>
    </Card>
  );
}

export async function EngineeringFootprint() {
  const [github, leetcode] = await Promise.all([getGithubStats(), getLeetCodeStats()]);

  return (
    <Section id="footprint" reveal aria-labelledby="footprint-heading">
      <header className="flex max-w-2xl flex-col gap-4">
        <Mono tone="accent">Activity</Mono>
        <Heading id="footprint-heading" as="h2" size="display-l">
          Engineering footprint
        </Heading>
        <Text size="body-l" tone="muted" className="max-w-xl">
          Code, contributions and problem solving.
        </Text>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
        <GithubPanel stats={github} />
        <LeetCodePanel stats={leetcode} />
      </div>
    </Section>
  );
}
