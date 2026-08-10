import NextLink from "next/link";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { Container } from "@/components/ui/section";
import { Heading, Mono, Text } from "@/components/ui/typography";
import { ArrowRight } from "@/lib/icons";

/**
 * Shared 404 body reused by the in-site boundary (with header/footer chrome)
 * and the root boundary (standalone), so both look identical.
 */
export function NotFoundContent() {
  return (
    <Container className="flex min-h-[60svh] flex-col items-start justify-center gap-6 py-24">
      <Mono tone="accent">404</Mono>
      <Heading as="h1" size="display-l">
        This page doesn&rsquo;t exist
      </Heading>
      <Text size="body-l" tone="muted" className="max-w-xl">
        The page you&rsquo;re looking for may have moved or never existed. Head back home or explore
        the work.
      </Text>
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button asChild size="lg">
          <NextLink href="/">
            Back home
            <Icon icon={ArrowRight} />
          </NextLink>
        </Button>
        <Link href="/#projects" variant="subtle" className="text-body-s font-mono uppercase">
          View projects
        </Link>
      </div>
    </Container>
  );
}
