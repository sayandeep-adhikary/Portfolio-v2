import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/typography";
import { ArrowUpRight, Award, Sparkles, Star, Trophy, type LucideIcon } from "@/lib/icons";
import type { Achievement, AchievementIcon } from "@/types/content";

const ICON_MAP: Record<AchievementIcon, LucideIcon> = {
  award: Award,
  trophy: Trophy,
  star: Star,
  spark: Sparkles,
};

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  const { title, context, icon, url } = achievement;

  const inner = (
    <>
      <span className="border-border bg-muted text-muted-foreground grid size-10 shrink-0 place-items-center rounded-md border">
        <Icon icon={ICON_MAP[icon]} />
      </span>
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="flex items-start justify-between gap-3">
          <span className="text-body-m text-foreground font-medium">{title}</span>
          {url ? (
            <Icon
              icon={ArrowUpRight}
              className="text-muted-foreground mt-0.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          ) : null}
        </span>
        {context ? (
          <Text as="span" size="body-s" tone="muted">
            {context}
          </Text>
        ) : null}
      </span>
    </>
  );

  if (url) {
    return (
      <Link href={url} variant="plain" className="group rounded-card block">
        <Card padding="none" variant="interactive" className="flex items-start gap-4 p-5">
          {inner}
        </Card>
      </Link>
    );
  }

  return (
    <Card padding="none" className="flex items-start gap-4 p-5">
      {inner}
    </Card>
  );
}
