import type {
  AboutContent,
  AchievementsContent,
  CertificationsContent,
  ContactContent,
  CurrentStatus,
  ExperienceContent,
  HeroContent,
  SectionMeta,
  SkillsContent,
  SocialLink,
} from "@/types/content";

/**
 * Local content source. Mirrors the shape of the future Sanity documents
 * (`currentStatus`, `socialLinks`, homepage `hero`) so swapping to CMS data is
 * a loader change, not a component change. Values here are meant to be edited.
 */

export const currentStatus: CurrentStatus = {
  state: "available",
  label: "Available for new work",
};

export const socialLinks: SocialLink[] = [
  { platform: "github", label: "GitHub", href: "https://github.com/username" },
  { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/username" },
  { platform: "twitter", label: "X", href: "https://x.com/username" },
  { platform: "email", label: "Email", href: "mailto:hello@example.com" },
];

export const heroContent: HeroContent = {
  index: "00",
  eyebrow: "Portfolio",
  role: "Frontend Engineer",
  location: "Remote",
  year: "2026",
  statement: "I build fast, precise interfaces for products that respect the people using them.",
  summary:
    "Frontend engineer focused on performance, accessibility, and design systems — turning ambitious ideas into interfaces that feel effortless.",
  image: null,
  primaryCta: { label: "View selected work", href: "#work" },
  secondaryCta: { label: "Get in touch", href: "#contact" },
};

export const aboutContent: AboutContent = {
  index: "03",
  eyebrow: "About",
  heading: "Engineering calm, precise interfaces.",
  intro:
    "I'm a frontend engineer who cares about the details most people never notice — until they're missing.",
  career:
    "For the past several years I've built production interfaces across startups and product teams, owning everything from design systems to performance budgets.",
  focus: [
    { label: "Performance", detail: "Sub-second loads on real, low-end devices." },
    { label: "Accessibility", detail: "Keyboard-first, semantic, WCAG-aligned by default." },
    { label: "Design systems", detail: "Tokenized, composable, built to scale." },
  ],
  resume: { label: "Download résumé", href: "/resume.pdf", meta: "PDF" },
};

export const skillsContent: SkillsContent = {
  index: "04",
  eyebrow: "Stack",
  heading: "A toolkit grouped by capability.",
  categories: [
    {
      title: "Frontend",
      caption: "Interfaces and interaction.",
      skills: [
        { name: "React", primary: true },
        { name: "Next.js", primary: true },
        { name: "TypeScript", primary: true },
        { name: "Tailwind CSS" },
        { name: "Framer Motion" },
      ],
    },
    {
      title: "Backend",
      caption: "APIs and data.",
      skills: [
        { name: "Node.js", primary: true },
        { name: "REST" },
        { name: "GraphQL" },
        { name: "PostgreSQL" },
      ],
    },
    {
      title: "Cloud",
      caption: "Ship and scale.",
      skills: [
        { name: "Vercel", primary: true },
        { name: "AWS" },
        { name: "Docker" },
        { name: "CI/CD" },
      ],
    },
    {
      title: "AI",
      caption: "Applied intelligence.",
      skills: [{ name: "OpenAI API" }, { name: "Vector search" }, { name: "RAG" }],
    },
    {
      title: "Languages",
      caption: "Day to day.",
      skills: [
        { name: "TypeScript", primary: true },
        { name: "JavaScript" },
        { name: "SQL" },
        { name: "Python" },
      ],
    },
    {
      title: "Tools",
      caption: "Design and delivery.",
      skills: [
        { name: "Sanity", primary: true },
        { name: "Figma" },
        { name: "Git" },
        { name: "Playwright" },
      ],
    },
  ],
};

export const experienceContent: ExperienceContent = {
  index: "05",
  eyebrow: "Experience",
  heading: "Where I've done the work.",
  entries: [
    {
      company: "Northwind Labs",
      position: "Senior Frontend Engineer",
      period: "2023 — Present",
      location: "Remote",
      type: "Full-time",
      summary: "Leading the frontend for a design-tooling platform.",
      responsibilities: [
        "Own the component library and design-token pipeline used across four product surfaces.",
        "Set performance budgets and enforce them in CI with Lighthouse and bundle checks.",
        "Mentor three engineers on accessibility and testing practices.",
      ],
      achievements: [
        "Cut median page load by 42% by moving to Server Components and streaming.",
        "Raised Lighthouse accessibility from 82 to 100 across the app.",
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Playwright"],
    },
    {
      company: "Cartography Studio",
      position: "Frontend Engineer",
      period: "2021 — 2023",
      location: "Berlin",
      type: "Full-time",
      summary: "Built data-heavy dashboards for a logistics client.",
      responsibilities: [
        "Shipped a real-time dashboard handling thousands of live updates per minute.",
        "Introduced an end-to-end testing suite that cut regressions by half.",
      ],
      achievements: [
        "Reduced bundle size by 35% through code-splitting and tree-shaking.",
        "Launched a theming system adopted by the whole product team.",
      ],
      technologies: ["React", "Node.js", "GraphQL", "PostgreSQL"],
    },
    {
      company: "Freelance",
      position: "Web Developer",
      period: "2019 — 2021",
      location: "Remote",
      type: "Contract",
      summary: "Delivered marketing sites and web apps for early-stage startups.",
      responsibilities: [
        "Partnered directly with founders to translate ideas into shipped products.",
        "Handled everything from design implementation to deployment and analytics.",
      ],
      achievements: ["Delivered 12+ production sites with a 100% on-time record."],
      technologies: ["JavaScript", "React", "Vercel"],
    },
  ],
};

export const featuredSection: SectionMeta = {
  index: "01",
  eyebrow: "Featured",
  heading: "Featured project.",
};

export const projectsSection: SectionMeta = {
  index: "02",
  eyebrow: "Selected work",
  heading: "A few things I've shipped.",
};

export const contactContent: ContactContent = {
  index: "08",
  eyebrow: "Contact",
  heading: "Let's build something precise.",
  message:
    "Have a project in mind, a role to fill, or just want to talk shop? I'd love to hear from you.",
  email: "hello@example.com",
  location: "Remote · available worldwide",
};

export const achievementsContent: AchievementsContent = {
  index: "07",
  eyebrow: "Achievements",
  heading: "Moments worth marking.",
  items: [
    {
      id: "conf-talk-2024",
      title: "Speaker at FrontendConf 2024",
      context: "Talk: Shipping fast interfaces with Server Components",
      year: "2024",
      icon: "star",
      url: "https://example.com/talk",
    },
    {
      id: "oss-award-2024",
      title: "Open Source Contributor of the Year",
      context: "Recognized for Prism UI",
      year: "2024",
      icon: "trophy",
    },
    {
      id: "hackathon-2023",
      title: "1st place, Global Accessibility Hackathon",
      context: "Built an assistive navigation tool",
      year: "2023",
      icon: "award",
      url: "https://example.com/hackathon",
    },
    {
      id: "article-2023",
      title: "Featured article on web performance",
      context: "Published on a leading engineering blog",
      year: "2023",
      icon: "spark",
      url: "https://example.com/article",
    },
    {
      id: "milestone-2022",
      title: "Reached 1M+ users on a shipped product",
      context: "Cadence habit tracker",
      year: "2022",
      icon: "trophy",
    },
    {
      id: "mentor-2022",
      title: "Mentored 20+ junior engineers",
      context: "Through a community program",
      year: "2022",
      icon: "star",
    },
  ],
};

export const certificationsContent: CertificationsContent = {
  index: "06",
  eyebrow: "Certifications",
  heading: "Credentials, verified.",
  items: [
    {
      id: "aws-solutions-architect",
      title: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      issued: "Mar 2024",
      category: "Cloud",
      credentialId: "AWS-PSA-4821",
      credentialUrl: "https://www.credly.com/",
      badge: null,
    },
    {
      id: "cka",
      title: "Certified Kubernetes Administrator",
      issuer: "The Linux Foundation",
      issued: "Nov 2023",
      category: "Cloud",
      credentialId: "CKA-2023-1902",
      credentialUrl: "https://www.credly.com/",
      badge: null,
    },
    {
      id: "meta-frontend",
      title: "Meta Front-End Developer Professional",
      issuer: "Meta",
      issued: "Jun 2023",
      category: "Frontend",
      credentialId: "META-FE-7734",
      credentialUrl: "https://www.coursera.org/",
      badge: null,
    },
    {
      id: "accessibility-specialist",
      title: "Web Accessibility Specialist (WAS)",
      issuer: "IAAP",
      issued: "Feb 2023",
      category: "Accessibility",
      credentialId: "IAAP-WAS-1180",
      credentialUrl: "https://www.accessibilityassociation.org/",
      badge: null,
    },
    {
      id: "security-plus",
      title: "CompTIA Security+",
      issuer: "CompTIA",
      issued: "Sep 2022",
      category: "Security",
      credentialId: "COMP-SEC-5567",
      credentialUrl: "https://www.credly.com/",
      badge: null,
    },
    {
      id: "scrum-master",
      title: "Professional Scrum Master I",
      issuer: "Scrum.org",
      issued: "May 2022",
      category: "Process",
      credentialId: "PSM-I-9042",
      credentialUrl: "https://www.scrum.org/",
      badge: null,
    },
  ],
};
