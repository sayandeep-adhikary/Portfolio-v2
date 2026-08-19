import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
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
 * while projects, gallery, and social links are drag-orderable collections
 * (the plugin maintains `orderRank`, which the frontend sorts by).
 */
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map(({ type, title }) =>
        S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      S.listItem().title("Projects").id("project").child(S.documentTypeList("project")),
      orderableDocumentListDeskItem({ type: "galleryItem", title: "Gallery", S, context }),
      orderableDocumentListDeskItem({ type: "socialLink", title: "Social links", S, context }),
    ]);
