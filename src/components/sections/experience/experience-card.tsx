import Image from "next/image";

import { Icon } from "@/components/ui/icon";
import { Tag } from "@/components/ui/tag";
import { Heading, Mono, Text } from "@/components/ui/typography";
import { ChevronDown } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { ExperienceEntry } from "@/types/content";

function DetailList({
  label,
  items,
  accent = false,
}: {
  label: string;
  items: string[];
  accent?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <Mono tone="muted">{label}</Mono>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              "text-body-m flex gap-3",
              accent ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "mt-2 size-1.5 shrink-0 rounded-full",
                accent ? "bg-primary" : "bg-border",
              )}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Meta separator, hidden from assistive tech.
function Sep() {
  return (
    <span aria-hidden className="text-border">
      |
    </span>
  );
}

export function ExperienceCard({
  entry,
  defaultOpen = false,
}: {
  entry: ExperienceEntry;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-card border-border bg-card hover:border-foreground/15 border transition-colors"
    >
      <summary className="rounded-card focus-visible:ring-ring focus-visible:ring-offset-background flex cursor-pointer list-none items-center gap-4 p-6 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:p-8 [&::-webkit-details-marker]:hidden">
        <div className="border-border bg-muted relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-md border">
          {entry.logo ? (
            <Image
              src={entry.logo.src}
              alt={entry.logo.alt}
              fill
              sizes="48px"
              placeholder={entry.logo.blurDataURL ? "blur" : "empty"}
              blurDataURL={entry.logo.blurDataURL}
              className="object-contain p-1.5"
            />
          ) : (
            <span aria-hidden className="text-muted-foreground text-body-m font-mono font-medium">
              {entry.company.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <Heading as="h3" size="heading-s">
              {entry.position}
            </Heading>
            <span aria-hidden className="text-muted-foreground">
              ·
            </span>
            <span className="text-body-m text-muted-foreground">{entry.company}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Mono tone="muted">{entry.period}</Mono>
            {entry.location ? (
              <>
                <Sep />
                <Mono tone="muted">{entry.location}</Mono>
              </>
            ) : null}
            {entry.type ? (
              <>
                <Sep />
                <Mono tone="muted">{entry.type}</Mono>
              </>
            ) : null}
          </div>
        </div>
        <Icon
          icon={ChevronDown}
          className="text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>

      <div className="border-border flex flex-col gap-6 border-t px-6 pt-6 pb-6 md:px-8 md:pb-8">
        {entry.summary ? (
          <Text size="body-m" tone="muted">
            {entry.summary}
          </Text>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2">
          <DetailList label="Responsibilities" items={entry.responsibilities} />
          <DetailList label="Achievements" items={entry.achievements} accent />
        </div>

        {entry.technologies.length > 0 ? (
          <div className="flex flex-col gap-3">
            <Mono tone="muted">Technologies</Mono>
            <ul className="flex flex-wrap gap-2">
              {entry.technologies.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </details>
  );
}
