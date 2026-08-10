import { Container } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading UI for an individual project page while its detail data resolves.
 */
export default function ProjectLoading() {
  return (
    <Container className="flex flex-col gap-12 py-16 md:gap-16 md:py-24" aria-hidden>
      <div className="flex flex-col gap-6">
        <Skeleton className="h-4 w-32" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-12 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-full max-w-2xl" />
        </div>
      </div>
      <Skeleton className="aspect-[16/10] w-full rounded-xl" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <span className="sr-only" role="status">
        Loading project…
      </span>
    </Container>
  );
}
