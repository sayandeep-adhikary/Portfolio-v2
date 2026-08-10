import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "@/sanity/lib/env";
import { schemaTypes, singletonTypes } from "@/sanity/schema";
import { structure } from "@/sanity/structure";

/**
 * Embedded Studio config (served at /studio). `projectId` falls back to a
 * placeholder so the module loads even before a Sanity project is configured;
 * the /studio route only mounts the Studio when a real project id is present.
 * Singleton section documents can be published/edited but not created/deleted.
 */
export default defineConfig({
  name: "portfolio",
  title: "Portfolio",
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((t) => !singletonTypes.has(t.schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter((action) =>
            ["publish", "discardChanges", "restore"].includes(action.action ?? ""),
          )
        : actions,
  },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
