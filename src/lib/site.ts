/**
 * Static site configuration used as the base for metadata and canonical URLs.
 * Editable content (name, tagline, SEO defaults) will be sourced from Sanity
 * `siteSettings` once the CMS layer lands and merged over these fallbacks.
 */
export const siteConfig = {
  name: "Sayandeep Adhikary",
  description:
    "A portfolio of fast, precise interfaces for products that respect the people using them.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  // Person/brand behind the portfolio — used for JSON-LD.
  jobTitle: "Frontend Engineer",
} as const;

export type SiteConfig = typeof siteConfig;
