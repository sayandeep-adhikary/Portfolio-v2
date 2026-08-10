import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { Heading, Mono, Text } from "@/components/ui/typography";
import { getSkills } from "@/sanity/lib/loaders";
import { cn } from "@/lib/utils";

export async function Skills() {
  const { index, eyebrow, heading, categories } = await getSkills();

  return (
    <Section id="stack" reveal aria-labelledby="stack-heading">
      <div className="flex flex-col gap-10 md:gap-12">
        <header className="flex max-w-2xl flex-col gap-4">
          <div className="flex items-center gap-3">
            <Mono tone="accent">{index}</Mono>
            <span aria-hidden className="text-muted-foreground">
              —
            </span>
            <Mono tone="muted">{eyebrow}</Mono>
          </div>
          <Heading id="stack-heading" as="h2" size="display-l">
            {heading}
          </Heading>
        </header>

        {categories.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {categories.map((category, categoryIndex) => (
              <li key={category.title}>
                <Card className="flex h-full flex-col gap-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <Heading as="h3" size="heading-s">
                      {category.title}
                    </Heading>
                    <Mono tone="muted">{String(categoryIndex + 1).padStart(2, "0")}</Mono>
                  </div>

                  {category.caption ? (
                    <Text size="body-s" tone="muted">
                      {category.caption}
                    </Text>
                  ) : null}

                  <ul className="mt-auto flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li key={skill.name}>
                        <Tag
                          className={cn(
                            skill.primary && "border-primary/30 bg-primary/5 text-foreground",
                          )}
                        >
                          {skill.name}
                        </Tag>
                      </li>
                    ))}
                  </ul>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="— No stack details yet" />
        )}
      </div>
    </Section>
  );
}
