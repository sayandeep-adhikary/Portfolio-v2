import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, hasSanityConfig, projectId } from "@/sanity/lib/env";

/**
 * Read-only CDN client. Null until Sanity is configured, so nothing throws at
 * import time; the fetch utility handles the null case with a fallback.
 */
export const client: SanityClient | null = hasSanityConfig
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" })
  : null;
