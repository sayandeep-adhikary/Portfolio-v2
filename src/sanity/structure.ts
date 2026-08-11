import type { StructureResolver } from "sanity/structure";

const SINGLETONS: { type: string; title: string }[] = [
  { type: "hero", title: "Hero" },
  { type: "currentStatus", title: "Current status" },
  { type: "about", title: "About" },
  { type: "skills", title: "Skills" },
  { type: "experience", title: "Experience" },
  { type: "certifications", title: "Certifications" },
  { type: "achievements", title: "Achievements" },
  { type: "contact", title: "Contact" },
];

/**
 * Custom desk: section singletons are edited in place (one document each),
 * while projects and social links are ordinary collections.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map(({ type, title }) =>
        S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("galleryItem").title("Gallery"),
      S.documentTypeListItem("socialLink").title("Social links"),
    ]);
