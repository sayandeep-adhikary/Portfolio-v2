import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineArrayMember, defineField, defineType } from "sanity";

/* Singleton section header fields reused across most documents. */
const sectionHeader = [
  defineField({ name: "index", type: "string", description: 'e.g. "01"' }),
  defineField({ name: "eyebrow", type: "string" }),
  defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
];

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    defineField({ name: "index", type: "string" }),
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "statement", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "image", type: "imageWithAlt" }),
    defineField({ name: "primaryCta", type: "cta" }),
    defineField({ name: "secondaryCta", type: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Hero" }) },
});

export const currentStatus = defineType({
  name: "currentStatus",
  title: "Current status",
  type: "document",
  fields: [
    defineField({
      name: "state",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Open to offers", value: "open" },
          { title: "Heads-down", value: "heads-down" },
          { title: "Unavailable", value: "unavailable" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
  preview: { prepare: () => ({ title: "Current status" }) },
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: "platform",
      type: "string",
      options: {
        list: [
          { title: "GitHub", value: "github" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "Instagram", value: "instagram" },
          { title: "Email", value: "email" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "url",
      type: "url",
      // Allow mailto:/tel: so email and phone social links validate.
      validation: (r) => r.required().uri({ scheme: ["http", "https", "mailto", "tel"] }),
    }),
    orderRankField({ type: "socialLink" }),
  ],
  preview: { select: { title: "label", subtitle: "platform" } },
});

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    ...sectionHeader,
    defineField({ name: "intro", type: "text", rows: 3 }),
    defineField({ name: "career", type: "text", rows: 4 }),
    defineField({
      name: "focus",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "detail", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "resume",
      type: "object",
      fields: [
        defineField({ name: "label", type: "string" }),
        defineField({ name: "file", type: "file" }),
        defineField({ name: "meta", type: "string" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About" }) },
});

export const skills = defineType({
  name: "skills",
  title: "Skills",
  type: "document",
  fields: [
    ...sectionHeader,
    defineField({
      name: "categories",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "caption", type: "string" }),
            defineField({
              name: "skills",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "name", type: "string" }),
                    defineField({ name: "primary", type: "boolean" }),
                  ],
                  preview: { select: { title: "name" } },
                }),
              ],
            }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Skills" }) },
});

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    ...sectionHeader,
    defineField({
      name: "entries",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "company", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "logo",
              title: "Company logo",
              type: "imageWithAlt",
              description: "Optional logo shown beside the company name.",
            }),
            defineField({ name: "position", type: "string", validation: (r) => r.required() }),
            defineField({ name: "period", type: "string" }),
            defineField({ name: "location", type: "string" }),
            defineField({ name: "type", type: "string" }),
            defineField({ name: "summary", type: "text", rows: 2 }),
            defineField({ name: "responsibilities", type: "array", of: [{ type: "string" }] }),
            defineField({ name: "achievements", type: "array", of: [{ type: "string" }] }),
            defineField({ name: "technologies", type: "array", of: [{ type: "string" }] }),
          ],
          preview: { select: { title: "position", subtitle: "company", media: "logo" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Experience" }) },
});

export const certifications = defineType({
  name: "certifications",
  title: "Certifications",
  type: "document",
  fields: [
    ...sectionHeader,
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "issuer", type: "string" }),
            defineField({ name: "issued", type: "string" }),
            defineField({ name: "category", type: "string" }),
            defineField({ name: "credentialId", type: "string" }),
            defineField({ name: "credentialUrl", type: "url" }),
            defineField({ name: "badge", type: "imageWithAlt" }),
          ],
          preview: { select: { title: "title", subtitle: "issuer" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Certifications" }) },
});

export const achievements = defineType({
  name: "achievements",
  title: "Achievements",
  type: "document",
  fields: [
    ...sectionHeader,
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "context", type: "string" }),
            defineField({ name: "year", type: "string" }),
            defineField({
              name: "icon",
              type: "string",
              options: {
                list: [
                  { title: "Award", value: "award" },
                  { title: "Trophy", value: "trophy" },
                  { title: "Star", value: "star" },
                  { title: "Spark", value: "spark" },
                ],
              },
            }),
            defineField({ name: "url", type: "url" }),
          ],
          preview: { select: { title: "title", subtitle: "year" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Achievements" }) },
});

export const contact = defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    ...sectionHeader,
    defineField({ name: "message", type: "text", rows: 3 }),
    defineField({ name: "email", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Contact" }) },
});

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "orderNumber",
      type: "number",
      description: "Manual portfolio order. Lower numbers appear first in the project list.",
      validation: (r) => r.min(1),
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    orderRankField({ type: "project" }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "outcome", type: "text", rows: 2 }),
    defineField({ name: "technologies", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "image", type: "imageWithAlt" }),
    defineField({ name: "gallery", type: "array", of: [{ type: "imageWithAlt" }] }),
    defineField({ name: "overview", type: "text", rows: 4 }),
    defineField({ name: "architecture", type: "text", rows: 4 }),
    defineField({ name: "challenges", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "lessons", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "links",
      type: "object",
      fields: [
        defineField({ name: "live", type: "url" }),
        defineField({ name: "github", type: "url" }),
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});

export const documentTypes = [
  hero,
  currentStatus,
  socialLink,
  about,
  skills,
  experience,
  certifications,
  achievements,
  contact,
  project,
];
