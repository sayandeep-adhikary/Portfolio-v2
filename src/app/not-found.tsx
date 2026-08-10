import { Brand } from "@/components/layout/brand";
import { NotFoundContent } from "@/components/layout/not-found-content";
import { Container } from "@/components/ui/section";

/**
 * Global 404 for routes outside the marketing site group. Rendered by the root
 * layout (no site header/footer), so it carries a minimal brand bar of its own.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-border border-b">
        <Container className="flex h-[var(--header-height)] items-center">
          <Brand />
        </Container>
      </header>
      <main className="flex flex-1 flex-col">
        <NotFoundContent />
      </main>
    </div>
  );
}
