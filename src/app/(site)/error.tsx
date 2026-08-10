"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Heading, Mono, Text } from "@/components/ui/typography";

/**
 * Route-level error boundary for the marketing site. Catches render/data errors
 * (e.g. an unexpected CMS failure) and offers a recovery path.
 */
export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60svh] flex-col items-start justify-center gap-6 py-24">
      <Mono tone="accent">Error</Mono>
      <Heading as="h1" size="display-l">
        Something went wrong
      </Heading>
      <Text size="body-l" tone="muted" className="max-w-xl">
        An unexpected error occurred while loading this page. You can try again, and it should
        recover.
      </Text>
      <div className="pt-2">
        <Button size="lg" onClick={reset}>
          Try again
        </Button>
      </div>
    </Container>
  );
}
