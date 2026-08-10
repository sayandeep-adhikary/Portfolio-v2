/**
 * Centralized GROQ. Shared projections (IMAGE, PROJECT_CARD) are defined once
 * and reused so no query logic is duplicated. Field names project directly onto
 * the TypeScript content types the components already consume.
 */

const IMAGE = `{
  "src": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "blurDataURL": asset->metadata.lqip,
  "alt": coalesce(alt, "")
}`;

const CTA = `{ label, href }`;

const PROJECT_CARD = `{
  "slug": slug.current,
  title,
  description,
  category,
  year,
  technologies,
  "image": image ${IMAGE},
  "links": {
    "live": links.live,
    "github": links.github,
    "caseStudy": "/work/" + slug.current
  }
}`;

const PROJECT_DETAIL = `{
  "slug": slug.current,
  title,
  description,
  category,
  year,
  role,
  outcome,
  technologies,
  "image": image ${IMAGE},
  "gallery": gallery[] ${IMAGE},
  overview,
  architecture,
  challenges,
  lessons,
  "links": {
    "live": links.live,
    "github": links.github,
    "caseStudy": "/work/" + slug.current
  },
  featured
}`;

/* -------------------------------------------------------------------------- */
/* Singletons & collections                                                   */
/* -------------------------------------------------------------------------- */
export const heroQuery = `*[_type == "hero"][0]{
  index, eyebrow, role, location, year, statement, summary,
  "image": image ${IMAGE},
  "primaryCta": primaryCta ${CTA},
  "secondaryCta": secondaryCta ${CTA}
}`;

export const currentStatusQuery = `*[_type == "currentStatus"][0]{ state, label }`;

export const socialLinksQuery = `*[_type == "socialLink"] | order(orderRank asc){
  platform, label, "href": url
}`;

export const aboutQuery = `*[_type == "about"][0]{
  index, eyebrow, heading, intro, career,
  focus[]{ label, detail },
  "resume": { "label": resume.label, "href": resume.file.asset->url, "meta": resume.meta }
}`;

export const skillsQuery = `*[_type == "skills"][0]{
  index, eyebrow, heading,
  categories[]{ title, caption, skills[]{ name, primary } }
}`;

export const experienceQuery = `*[_type == "experience"][0]{
  index, eyebrow, heading,
  entries[]{ company, position, period, location, type, summary, responsibilities, achievements, technologies }
}`;

export const certificationsQuery = `*[_type == "certifications"][0]{
  index, eyebrow, heading,
  items[]{ "id": _key, title, issuer, issued, category, credentialId, credentialUrl, "badge": badge ${IMAGE} }
}`;

export const achievementsQuery = `*[_type == "achievements"][0]{
  index, eyebrow, heading,
  items[]{ "id": _key, title, context, year, icon, url }
}`;

export const contactQuery = `*[_type == "contact"][0]{
  index, eyebrow, heading, message, email, location
}`;

/* -------------------------------------------------------------------------- */
/* Projects                                                                   */
/* -------------------------------------------------------------------------- */
export const projectCardsQuery = `*[_type == "project" && !featured] | order(orderRank asc) ${PROJECT_CARD}`;

export const featuredProjectQuery = `*[_type == "project" && featured == true][0] ${PROJECT_DETAIL}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] ${PROJECT_DETAIL}`;

export const projectSlugsQuery = `*[_type == "project" && defined(slug.current)].slug.current`;

// All projects (incl. featured), ordered — used to compute prev/next.
export const allProjectsNavQuery = `*[_type == "project"] | order(orderRank asc) ${PROJECT_CARD}`;
