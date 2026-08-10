/**
 * One-time seed: pushes the local fallback content into Sanity as published
 * documents so the Studio opens pre-filled for testing (text only — images are
 * left empty). Safe to re-run: it overwrites the same document ids.
 *
 * Usage:
 *   1. Create an Editor token: sanity.io/manage → API → Tokens → Editor.
 *   2. Put it in .env.local as SANITY_API_WRITE_TOKEN=...
 *   3. npm run seed
 */
import { readFileSync } from "node:fs";

import { createClient } from "next-sanity";

import {
  aboutContent,
  achievementsContent,
  certificationsContent,
  contactContent,
  currentStatus,
  experienceContent,
  heroContent,
  skillsContent,
  socialLinks,
} from "../src/lib/content";
import { projects } from "../src/lib/projects";

function loadEnvLocal() {
  try {
    const raw = readFileSync(".env.local", "utf8");
    for (const line of raw.split("\n")) {
      const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (!key) continue;
      let value = (rawValue ?? "").trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // No .env.local — fall back to the real environment.
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "\nMissing config. Set these in .env.local:\n" +
      "  NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id\n" +
      "  SANITY_API_WRITE_TOKEN=an_editor_token   (sanity.io/manage → API → Tokens → Editor)\n",
  );
  process.exit(1);
}

const rank = (i: number) => (i + 1).toString().padStart(4, "0");

const hero = {
  _id: "hero",
  _type: "hero",
  index: heroContent.index,
  eyebrow: heroContent.eyebrow,
  role: heroContent.role,
  location: heroContent.location,
  year: heroContent.year,
  statement: heroContent.statement,
  summary: heroContent.summary,
  primaryCta: { _type: "cta", ...heroContent.primaryCta },
  secondaryCta: { _type: "cta", ...heroContent.secondaryCta },
};

const status = {
  _id: "currentStatus",
  _type: "currentStatus",
  state: currentStatus.state,
  label: currentStatus.label,
};

const about = {
  _id: "about",
  _type: "about",
  index: aboutContent.index,
  eyebrow: aboutContent.eyebrow,
  heading: aboutContent.heading,
  intro: aboutContent.intro,
  career: aboutContent.career,
  focus: aboutContent.focus.map((f, i) => ({
    _key: `focus${i}`,
    label: f.label,
    detail: f.detail,
  })),
  resume: { label: aboutContent.resume.label, meta: aboutContent.resume.meta },
};

const skills = {
  _id: "skills",
  _type: "skills",
  index: skillsContent.index,
  eyebrow: skillsContent.eyebrow,
  heading: skillsContent.heading,
  categories: skillsContent.categories.map((c, i) => ({
    _key: `cat${i}`,
    title: c.title,
    caption: c.caption,
    skills: c.skills.map((s, j) => ({
      _key: `sk${i}_${j}`,
      name: s.name,
      ...(s.primary ? { primary: true } : {}),
    })),
  })),
};

const experience = {
  _id: "experience",
  _type: "experience",
  index: experienceContent.index,
  eyebrow: experienceContent.eyebrow,
  heading: experienceContent.heading,
  entries: experienceContent.entries.map((e, i) => ({ _key: `exp${i}`, ...e })),
};

const certifications = {
  _id: "certifications",
  _type: "certifications",
  index: certificationsContent.index,
  eyebrow: certificationsContent.eyebrow,
  heading: certificationsContent.heading,
  items: certificationsContent.items.map((c) => ({
    _key: c.id,
    title: c.title,
    issuer: c.issuer,
    issued: c.issued,
    category: c.category,
    ...(c.credentialId ? { credentialId: c.credentialId } : {}),
    ...(c.credentialUrl ? { credentialUrl: c.credentialUrl } : {}),
  })),
};

const achievements = {
  _id: "achievements",
  _type: "achievements",
  index: achievementsContent.index,
  eyebrow: achievementsContent.eyebrow,
  heading: achievementsContent.heading,
  items: achievementsContent.items.map((a) => ({
    _key: a.id,
    title: a.title,
    year: a.year,
    icon: a.icon,
    ...(a.context ? { context: a.context } : {}),
    ...(a.url ? { url: a.url } : {}),
  })),
};

const contact = {
  _id: "contact",
  _type: "contact",
  index: contactContent.index,
  eyebrow: contactContent.eyebrow,
  heading: contactContent.heading,
  message: contactContent.message,
  email: contactContent.email,
  location: contactContent.location,
};

const social = socialLinks.map((s, i) => ({
  _id: `socialLink-${s.platform}`,
  _type: "socialLink",
  platform: s.platform,
  label: s.label,
  url: s.href,
  orderRank: rank(i),
}));

const projectDocs = projects.map((p, i) => ({
  _id: `project-${p.slug}`,
  _type: "project",
  title: p.title,
  slug: { _type: "slug", current: p.slug },
  featured: Boolean(p.featured),
  orderRank: rank(i),
  description: p.description,
  category: p.category,
  year: p.year,
  role: p.role,
  outcome: p.outcome,
  technologies: p.technologies,
  overview: p.overview,
  architecture: p.architecture,
  challenges: p.challenges,
  lessons: p.lessons,
  links: {
    ...(p.links.live ? { live: p.links.live } : {}),
    ...(p.links.github ? { github: p.links.github } : {}),
  },
}));

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

type SeedDoc = { _id: string; _type: string } & Record<string, unknown>;

async function seed() {
  const singletons = [
    hero,
    status,
    about,
    skills,
    experience,
    certifications,
    achievements,
    contact,
  ];
  const documents: SeedDoc[] = [...singletons, ...social, ...projectDocs];
  const tx = client.transaction();
  for (const doc of documents) {
    tx.createOrReplace(doc);
  }
  await tx.commit();
  console.log(
    `Seeded ${singletons.length} singletons, ${social.length} social links, ${projectDocs.length} projects.`,
  );
  console.log("Open /studio to review — everything is published.");
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
