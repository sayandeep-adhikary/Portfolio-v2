import { defineField, defineType } from "sanity";

/** Image with a required-ish alt field; `asset->metadata` supplies lqip + dimensions. */
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describe the image for screen readers and SEO.",
      // Require alt only once an image is actually uploaded.
      validation: (rule) =>
        rule.custom((alt, context) => {
          const parent = context.parent as { asset?: unknown } | undefined;
          if (parent?.asset && !alt) return "Add alt text for this image.";
          return true;
        }),
    }),
  ],
});

/** Call to action — { label, href }. */
export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
  ],
});

export const objectTypes = [imageWithAlt, cta];
