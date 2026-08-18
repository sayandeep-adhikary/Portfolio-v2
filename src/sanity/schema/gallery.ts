import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

/** A single personal photograph for the homepage gallery. */
export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery item",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Short internal title (used in the Studio and as a fallback label).",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      type: "imageWithAlt",
      description: "The photograph. Alt text is required for accessibility.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "caption", type: "string", description: "Optional short caption." }),
    defineField({ name: "category", type: "string", description: "Optional grouping label." }),
    defineField({ name: "date", type: "date", description: "Optional date taken." }),
    orderRankField({ type: "galleryItem" }),
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});
