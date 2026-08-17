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
    defineField({
      name: "displayMode",
      title: "Display mode",
      type: "string",
      description:
        "Art direction. 'Auto' picks a layout from the image's aspect ratio; the others force a slot.",
      options: {
        list: [
          { title: "Auto (from aspect ratio)", value: "auto" },
          { title: "Featured (large slot)", value: "featured" },
          { title: "Landscape", value: "landscape" },
          { title: "Portrait", value: "portrait" },
          { title: "Square", value: "square" },
        ],
        layout: "radio",
      },
      initialValue: "auto",
      validation: (r) => r.required(),
    }),
    orderRankField({ type: "galleryItem" }),
  ],
  preview: {
    select: { title: "title", subtitle: "displayMode", media: "image" },
  },
});
