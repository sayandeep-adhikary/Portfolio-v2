import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

/**
 * Builds the base metadata for the site. Route segments extend this via
 * `generateMetadata`, and the defaults will later be hydrated from Sanity
 * `siteSettings`. Kept as a single source so SEO fields never drift per route.
 */
export function buildMetadata(overrides: Metadata = {}): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s — ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...overrides,
  };
}
