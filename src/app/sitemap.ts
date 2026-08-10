import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { getAllProjectSlugs } from "@/sanity/lib/loaders";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const slugs = await getAllProjectSlugs();

  const projects: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${siteConfig.url}/work/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projects,
  ];
}
