import { Container } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Route-level loading UI streamed while the homepage's async Server Components
 * resolve their data. Mirrors the hero's layout to minimize layout shift.
 */
export default function HomeLoading() {
  return (
    <Container className="flex min-h-[calc(100svh-var(--header-height))] items-center py-16 md:py-24">
      <div
        className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8"
        aria-hidden
      >
        <div className="flex flex-col gap-6 lg:col-span-7">
          <Skeleton className="h-4 w-48" />
          <div className="flex flex-col gap-3">
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-4/5 rounded-lg" />
            <Skeleton className="h-14 w-2/3 rounded-lg" />
          </div>
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-4 w-3/4 max-w-xl" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-11 w-36" />
            <Skeleton className="h-11 w-36" />
          </div>
        </div>
        <div className="lg:col-span-5">
          <Skeleton className="aspect-[4/5] w-full rounded-xl" />
        </div>
      </div>
      <span className="sr-only" role="status">
        Loading content…
      </span>
    </Container>
  );
}
