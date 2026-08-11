import type { ReactNode } from "react";

import { ContactForm } from "@/components/sections/contact/contact-form";
import { CopyButton } from "@/components/sections/contact/copy-button";
import { StatusIndicator } from "@/components/sections/status-indicator";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { CornerTicks } from "@/components/ui/corner-ticks";
import { Glow } from "@/components/ui/glow";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { Section } from "@/components/ui/section";
import { Heading, Mono, Text } from "@/components/ui/typography";
import { getAbout, getContact, getCurrentStatus, getSocialLinks } from "@/sanity/lib/loaders";
import { Download, MapPin } from "@/lib/icons";

function stripUrl(href: string): string {
  return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function ContactRow({
  icon,
  label,
  children,
  action,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <li className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="border-border bg-muted text-muted-foreground grid size-10 shrink-0 place-items-center rounded-md border">
          {icon}
        </span>
        <div className="flex min-w-0 flex-col">
          <Mono tone="muted">{label}</Mono>
          {children}
        </div>
      </div>
      {action}
    </li>
  );
}

const valueLinkClasses =
  "block truncate text-body-m text-foreground transition-colors hover:text-primary";

export async function Contact() {
  const [contactContent, { resume }, currentStatus, socialLinks] = await Promise.all([
    getContact(),
    getAbout(),
    getCurrentStatus(),
    getSocialLinks(),
  ]);
  const { index, eyebrow, heading, message, email, location } = contactContent;
  const linkedin = socialLinks.find((link) => link.platform === "linkedin");
  const github = socialLinks.find((link) => link.platform === "github");

  return (
    <Section id="contact" reveal aria-labelledby="contact-heading">
      <div className="rounded-card border-border bg-card/40 relative isolate overflow-hidden border p-6 sm:p-10 lg:p-16">
        <CornerTicks />
        <Glow className="bottom-[-7rem] left-[-5rem] h-[20rem] w-[20rem] opacity-50" />
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex min-w-0 flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Mono tone="accent">{index}</Mono>
                <span aria-hidden className="text-muted-foreground">
                  —
                </span>
                <Mono tone="muted">{eyebrow}</Mono>
              </div>
              <Heading id="contact-heading" as="h2" size="display-l" gradient className="max-w-md">
                {heading}
              </Heading>
              <Text size="body-l" tone="muted" className="max-w-md">
                {message}
              </Text>
              <div>
                <StatusIndicator status={currentStatus} />
              </div>
            </div>

            <ul className="flex flex-col gap-4">
              <ContactRow
                label="Email"
                icon={<MailIcon className="size-[18px]" />}
                action={<CopyButton value={email} label="Copy email address" />}
              >
                <Link href={`mailto:${email}`} variant="plain" className={valueLinkClasses}>
                  {email}
                </Link>
              </ContactRow>

              {linkedin ? (
                <ContactRow label="LinkedIn" icon={<LinkedinIcon className="size-[18px]" />}>
                  <Link href={linkedin.href} variant="plain" className={valueLinkClasses}>
                    {stripUrl(linkedin.href)}
                  </Link>
                </ContactRow>
              ) : null}

              {github ? (
                <ContactRow label="GitHub" icon={<GithubIcon className="size-[18px]" />}>
                  <Link href={github.href} variant="plain" className={valueLinkClasses}>
                    {stripUrl(github.href)}
                  </Link>
                </ContactRow>
              ) : null}

              <ContactRow label="Location" icon={<Icon icon={MapPin} className="size-[18px]" />}>
                <span className="text-body-m text-foreground break-words">{location}</span>
              </ContactRow>
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild variant="secondary">
                <a href={resume.href} download>
                  {resume.label}
                  <Icon icon={Download} />
                </a>
              </Button>
              {resume.meta ? <Mono tone="muted">{resume.meta}</Mono> : null}
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-6">
            <Mono tone="muted">Or send a message</Mono>
            <ContactForm recipient={email} />
          </div>
        </div>
      </div>
    </Section>
  );
}
