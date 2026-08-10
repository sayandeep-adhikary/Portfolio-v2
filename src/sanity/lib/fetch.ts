import "server-only";

import { client } from "@/sanity/lib/client";

/**
 * One reusable fetch utility for all Sanity reads. Tags enable granular
 * webhook revalidation; a fallback keeps the app functional when Sanity is
 * unconfigured or a request fails.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  fallback,
  revalidate = 3600,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  fallback: T;
  revalidate?: number;
}): Promise<T> {
  if (!client) return fallback;

  try {
    const result = await client.fetch<T>(query, params, {
      next: { tags, revalidate },
    });
    // A configured CMS with a missing document returns null — fall back so the
    // UI never renders undefined. Empty arrays are valid and pass through.
    return result ?? fallback;
  } catch (error) {
    console.error("[sanityFetch] query failed, using fallback:", error);
    return fallback;
  }
}
