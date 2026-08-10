import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { Heading, Text } from "@/components/ui/typography";
import { ExternalLink } from "@/lib/icons";
import type { Certification } from "@/types/content";

export function CertificationCard({ certification }: { certification: Certification }) {
  const { title, issuer, issued, category, credentialId, credentialUrl, badge } = certification;

  return (
    <Card className="flex h-full flex-col gap-5">
      <div className="flex items-start gap-4">
        <div className="border-border bg-muted relative size-14 shrink-0 overflow-hidden rounded-md border">
          {badge ? (
            <Image
              src={badge.src}
              alt={badge.alt}
              fill
              loading="lazy"
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <div
              aria-hidden
              className="text-muted-foreground/50 grid size-full place-items-center font-mono text-lg"
            >
              ◆
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Heading as="h3" size="heading-s">
            {title}
          </Heading>
          <Text size="body-s" tone="muted">
            {issuer}
          </Text>
        </div>
      </div>

      <dl className="text-body-s flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-mono-label text-muted-foreground font-mono uppercase">Issued</dt>
          <dd className="text-foreground font-medium">{issued}</dd>
        </div>
        {credentialId ? (
          <div className="flex items-center justify-between gap-4">
            <dt className="text-mono-label text-muted-foreground font-mono uppercase">ID</dt>
            <dd className="text-body-s text-foreground font-mono">{credentialId}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-auto flex items-center justify-between gap-3">
        <Badge variant="outline">{category}</Badge>
        {credentialUrl ? (
          <Link
            href={credentialUrl}
            variant="plain"
            aria-label={`Verify ${title} credential (opens in a new tab)`}
            className="text-body-s text-foreground hover:text-primary inline-flex items-center gap-1.5 font-medium transition-colors"
          >
            Verify
            <Icon icon={ExternalLink} className="size-3.5" />
          </Link>
        ) : null}
      </div>
    </Card>
  );
}
