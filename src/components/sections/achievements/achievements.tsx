import { AchievementCard } from "@/components/sections/achievements/achievement-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Section } from "@/components/ui/section";
import { Heading, Mono } from "@/components/ui/typography";
import { getAchievements } from "@/sanity/lib/loaders";

export async function Achievements() {
  const { index, eyebrow, heading, items } = await getAchievements();

  // Group by year, most recent first.
  const years = Array.from(new Set(items.map((item) => item.year))).sort(
    (a, b) => Number(b) - Number(a),
  );

  return (
    <Section id="achievements" reveal aria-labelledby="achievements-heading">
      <div className="flex flex-col gap-10 md:gap-12">
        <header className="flex max-w-2xl flex-col gap-4">
          <div className="flex items-center gap-3">
            <Mono tone="accent">{index}</Mono>
            <span aria-hidden className="text-muted-foreground">
              —
            </span>
            <Mono tone="muted">{eyebrow}</Mono>
          </div>
          <Heading id="achievements-heading" as="h2" size="display-l">
            {heading}
          </Heading>
        </header>

        <div className="flex flex-col gap-10 md:gap-12">
          {years.length > 0 ? (
            years.map((year) => (
              <div key={year} className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-8">
                <h3 className="text-heading-m text-foreground font-mono tabular-nums lg:col-span-3">
                  {year}
                </h3>
                <ul className="flex flex-col gap-4 lg:col-span-9">
                  {items
                    .filter((item) => item.year === year)
                    .map((achievement) => (
                      <li key={achievement.id}>
                        <AchievementCard achievement={achievement} />
                      </li>
                    ))}
                </ul>
              </div>
            ))
          ) : (
            <EmptyState title="— No achievements to show yet" />
          )}
        </div>
      </div>
    </Section>
  );
}
