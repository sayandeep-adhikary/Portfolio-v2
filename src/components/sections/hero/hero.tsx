import { HeroPortrait } from "@/components/sections/hero/hero-portrait";
import { SocialLinks } from "@/components/sections/social-links";
import { StatusIndicator } from "@/components/sections/status-indicator";
import { Button } from "@/components/ui/button";
import { Glow } from "@/components/ui/glow";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { Heading, Mono, Text } from "@/components/ui/typography";
import { getCurrentStatus, getHero, getSocialLinks } from "@/sanity/lib/loaders";
import { ArrowRight } from "@/lib/icons";

export async function Hero() {
  const [heroContent, currentStatus, socialLinks] = await Promise.all([
    getHero(),
    getCurrentStatus(),
    getSocialLinks(),
  ]);

  const {
    index,
    eyebrow,
    role,
    location,
    year,
    statement,
    summary,
    image,
    primaryCta,
    secondaryCta,
  } = heroContent;

  return (
    <Section
      id="top"
      spacing="none"
      className="relative isolate flex min-h-[calc(100svh-var(--header-height))] items-center py-16 md:py-24"
    >
      <Glow className="top-[-5rem] right-[-6rem] h-[24rem] w-[24rem] md:h-[32rem] md:w-[32rem]" />
      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-6 md:gap-8 lg:col-span-7">
          <div
            className="animate-fade-up flex flex-wrap items-center gap-x-3 gap-y-1"
            style={{ animationDelay: "40ms" }}
          >
            <Mono tone="accent">{index}</Mono>
            <span aria-hidden className="text-muted-foreground">
              —
            </span>
            <Mono tone="muted">
              {eyebrow} / {year}
            </Mono>
            <span aria-hidden className="text-border hidden sm:inline">
              |
            </span>
            <Mono tone="muted">
              {role} · {location}
            </Mono>
          </div>

          {/* LCP element — rendered instantly, never animated. */}
          <Heading
            as="h1"
            size="display-xl"
            className="max-w-4xl bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(115deg, color-mix(in oklch, var(--foreground) 85%, var(--primary)) 15%, color-mix(in oklch, var(--foreground) 52%, var(--accent-2)) 100%)",
            }}
          >
            {statement}
          </Heading>

          <Text
            size="body-l"
            tone="muted"
            balance
            className="animate-fade-up max-w-xl"
            style={{ animationDelay: "140ms" }}
          >
            {summary}
          </Text>

          <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <StatusIndicator status={currentStatus} />
          </div>

          <div
            className="animate-fade-up flex flex-wrap items-center gap-3"
            style={{ animationDelay: "260ms" }}
          >
            <Button asChild size="lg">
              <a href={primaryCta.href}>
                {primaryCta.label}
                <Icon icon={ArrowRight} />
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href={secondaryCta.href}>{secondaryCta.label}</a>
            </Button>
          </div>

          <div
            className="animate-fade-up flex items-center gap-4"
            style={{ animationDelay: "320ms" }}
          >
            <Mono tone="muted">Elsewhere</Mono>
            <SocialLinks links={socialLinks} />
          </div>
        </div>

        <div className="animate-fade-up lg:col-span-5" style={{ animationDelay: "140ms" }}>
          <HeroPortrait image={image} />
        </div>
      </div>
    </Section>
  );
}
