import type { SchemaTypeDefinition } from "sanity";

import { documentTypes } from "@/sanity/schema/documents";
import { objectTypes } from "@/sanity/schema/objects";

export const schemaTypes: SchemaTypeDefinition[] = [...objectTypes, ...documentTypes];

/** Document type names that exist as a single editable instance (not a collection). */
export const singletonTypes = new Set([
  "hero",
  "currentStatus",
  "about",
  "skills",
  "experience",
  "certifications",
  "achievements",
  "contact",
]);
