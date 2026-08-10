/**
 * Sanity configuration from env. `hasSanityConfig` lets loaders fall back to
 * local content when the project isn't configured yet (keeps the app working).
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";

export const hasSanityConfig = projectId.trim().length > 0;
