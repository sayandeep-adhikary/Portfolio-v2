export type NavItem = {
  label: string;
  href: string;
};

/**
 * Primary navigation. Hrefs point at homepage section anchors so the nav works
 * from any route. Will be sourced from Sanity `siteSettings.navLinks` later.
 */
export const navItems: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Stack", href: "/#stack" },
];

export const navPrimaryAction: NavItem = {
  label: "Get in touch",
  href: "/#contact",
};

/** Extracts a section id ("work") from an anchor href ("/#work"). */
export function sectionIdFromHref(href: string): string {
  const hashIndex = href.indexOf("#");
  return hashIndex >= 0 ? href.slice(hashIndex + 1) : "";
}
