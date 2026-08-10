import { NotFoundContent } from "@/components/layout/not-found-content";

/**
 * 404 within the site chrome. Catches `notFound()` from project pages and any
 * unmatched route under the marketing site.
 */
export default function NotFound() {
  return <NotFoundContent />;
}
