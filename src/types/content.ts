export type StatusState = "available" | "open" | "heads-down" | "unavailable";

export type CurrentStatus = {
  state: StatusState;
  label: string;
};

export type SocialPlatform = "github" | "linkedin" | "instagram" | "email";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

export type ProfileImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
};

export type CallToAction = {
  label: string;
  href: string;
};

export type HeroContent = {
  index: string;
  eyebrow: string;
  role: string;
  location: string;
  year: string;
  statement: string;
  summary: string;
  image: ProfileImage | null;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
};

export type FocusItem = {
  label: string;
  detail: string;
};

export type ResumeLink = {
  label: string;
  href: string;
  meta?: string;
};

export type AboutContent = {
  index: string;
  eyebrow: string;
  heading: string;
  intro: string;
  career: string;
  focus: FocusItem[];
  resume: ResumeLink;
};

export type Skill = {
  name: string;
  primary?: boolean;
};

export type SkillCategory = {
  title: string;
  caption?: string;
  skills: Skill[];
};

export type SkillsContent = {
  index: string;
  eyebrow: string;
  heading: string;
  categories: SkillCategory[];
};

export type ExperienceEntry = {
  company: string;
  position: string;
  period: string;
  location?: string;
  type?: string;
  summary?: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
};

export type ExperienceContent = {
  index: string;
  eyebrow: string;
  heading: string;
  entries: ExperienceEntry[];
};

export type ProjectLinks = {
  live?: string;
  github?: string;
  caseStudy?: string;
};

/** Section header metadata (index, eyebrow, heading) shared by homepage sections. */
export type SectionMeta = {
  index: string;
  eyebrow: string;
  heading: string;
};

/** Canonical project document — mirrors the future Sanity `project` doc. */
export type ProjectDetail = {
  slug: string;
  title: string;
  description: string;
  category: string;
  year: string;
  role: string;
  outcome: string;
  technologies: string[];
  image: ProfileImage | null;
  gallery: ProfileImage[];
  overview: string;
  architecture: string;
  challenges: string[];
  lessons: string[];
  links: ProjectLinks;
  featured?: boolean;
};

/** Card projection used by the grid and featured summary. */
export type ProjectCardData = Pick<
  ProjectDetail,
  "slug" | "title" | "description" | "category" | "year" | "technologies" | "image" | "links"
>;

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  category: string;
  credentialId?: string;
  credentialUrl?: string;
  badge: ProfileImage | null;
};

export type CertificationsContent = {
  index: string;
  eyebrow: string;
  heading: string;
  items: Certification[];
};

export type AchievementIcon = "award" | "trophy" | "star" | "spark";

export type Achievement = {
  id: string;
  title: string;
  context?: string;
  year: string;
  icon: AchievementIcon;
  url?: string;
};

export type AchievementsContent = {
  index: string;
  eyebrow: string;
  heading: string;
  items: Achievement[];
};

export type ContactContent = {
  index: string;
  eyebrow: string;
  heading: string;
  message: string;
  email: string;
  location: string;
};

export type GalleryDisplayMode = "auto" | "featured" | "landscape" | "portrait" | "square";

/** A gallery image carries its intrinsic aspect ratio for layout classification. */
export type GalleryImage = ProfileImage & { aspectRatio: number };

export type GalleryItem = {
  id: string;
  title: string;
  image: GalleryImage;
  caption?: string;
  category?: string;
  date?: string;
  displayMode: GalleryDisplayMode;
  order?: number;
};
