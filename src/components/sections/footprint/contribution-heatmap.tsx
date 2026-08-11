import {
  contributionLevel,
  maxDayCount,
  recentWeeks,
  type ContributionWeek,
} from "@/lib/footprint";

// Intensity tinted with the electric-cyan secondary accent; level 0 uses the muted surface.
const LEVEL_CLASS = [
  "bg-muted",
  "bg-accent-2/25",
  "bg-accent-2/45",
  "bg-accent-2/70",
  "bg-accent-2",
] as const;

// A compact recent window keeps the strip readable and free of horizontal scroll on mobile.
const WEEKS_IN_VIEW = 17;

export function ContributionHeatmap({ weeks }: { weeks: ContributionWeek[] }) {
  const visible = recentWeeks(weeks, WEEKS_IN_VIEW);
  if (visible.length === 0) return null;
  const max = maxDayCount(visible);

  return (
    // Decorative — the yearly total is announced as text in the panel.
    <div aria-hidden className="grid grid-flow-col grid-rows-7 gap-1">
      {visible.map((week, weekIndex) =>
        week.days.map((day, dayIndex) => (
          <span
            key={`${weekIndex}-${dayIndex}`}
            className={`size-2 rounded-[2px] ${LEVEL_CLASS[contributionLevel(day.count, max)]}`}
          />
        )),
      )}
    </div>
  );
}
