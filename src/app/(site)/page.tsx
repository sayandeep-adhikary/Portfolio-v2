import { About } from "@/components/sections/about/about";
import { Achievements } from "@/components/sections/achievements/achievements";
import { Certifications } from "@/components/sections/certifications/certifications";
import { Contact } from "@/components/sections/contact/contact";
import { EngineeringFootprint } from "@/components/sections/footprint/engineering-footprint";
import { Experience } from "@/components/sections/experience/experience";
import { Featured } from "@/components/sections/featured/featured";
import { Gallery } from "@/components/sections/gallery/gallery";
import { Hero } from "@/components/sections/hero/hero";
import { Projects } from "@/components/sections/projects/projects";
import { Skills } from "@/components/sections/skills/skills";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";
import { getSocialLinks } from "@/sanity/lib/loaders";

export default async function HomePage() {
  const socialLinks = await getSocialLinks();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        url: siteConfig.url,
        jobTitle: siteConfig.jobTitle,
        sameAs: socialLinks.map((link) => link.href),
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      <Featured />
      <Projects />
      <About />
      <Skills />
      <Experience />
      <Certifications />
      <EngineeringFootprint />
      <Achievements />
      <Gallery />
      <Contact />
    </>
  );
}
