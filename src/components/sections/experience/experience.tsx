import { ExperienceCard } from "@/components/sections/experience/experience-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Section } from "@/components/ui/section";
import { Heading, Mono } from "@/components/ui/typography";
import { getExperience } from "@/sanity/lib/loaders";

export async function Experience() {
  const { index, eyebrow, heading, entries } = await getExperience();

  return (
    <Section id="experience" reveal glow="right" aria-labelledby="experience-heading">
      <div className="flex flex-col gap-10 md:gap-12">
        <header className="flex max-w-2xl flex-col gap-4">
          <div className="flex items-center gap-3">
            <Mono tone="accent">{index}</Mono>
            <span aria-hidden className="text-muted-foreground">
              —
            </span>
            <Mono tone="muted">{eyebrow}</Mono>
          </div>
          <Heading id="experience-heading" as="h2" size="display-l" gradient>
            {heading}
          </Heading>
        </header>

        {entries.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {entries.map((entry, entryIndex) => (
              <li key={`${entry.company}-${entry.period}`}>
                <ExperienceCard entry={entry} defaultOpen={entryIndex === 0} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="— No experience to show yet" />
        )}
      </div>
    </Section>
  );
}
