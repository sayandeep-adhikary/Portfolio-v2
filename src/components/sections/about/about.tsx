import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { Heading, Mono, Text } from "@/components/ui/typography";
import { getAbout } from "@/sanity/lib/loaders";
import { Download } from "@/lib/icons";

export async function About() {
  const { index, eyebrow, heading, intro, career, focus, resume } = await getAbout();

  return (
    <Section id="about" reveal aria-labelledby="about-heading">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <header className="flex flex-col gap-4 lg:col-span-4">
          <div className="flex items-center gap-3">
            <Mono tone="accent">{index}</Mono>
            <span aria-hidden className="text-muted-foreground">
              —
            </span>
            <Mono tone="muted">{eyebrow}</Mono>
          </div>
          <Heading id="about-heading" as="h2" size="display-l" className="max-w-md">
            {heading}
          </Heading>
        </header>

        <div className="flex flex-col gap-12 lg:col-span-8">
          <div className="flex max-w-2xl flex-col gap-4">
            <Text size="body-l">{intro}</Text>
            <Text size="body-m" tone="muted">
              {career}
            </Text>
          </div>

          <div className="flex flex-col gap-4">
            <Mono tone="muted">Current focus</Mono>
            <ul className="divide-border border-border divide-y border-y">
              {focus.map((item) => (
                <li key={item.label} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <span className="text-body-m text-foreground font-medium">{item.label}</span>
                  <Text size="body-m" tone="muted">
                    {item.detail}
                  </Text>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild variant="secondary">
              <a href={resume.href} download>
                {resume.label}
                <Icon icon={Download} />
              </a>
            </Button>
            {resume.meta ? <Mono tone="muted">{resume.meta}</Mono> : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
