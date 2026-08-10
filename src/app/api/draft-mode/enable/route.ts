import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { client } from "@/sanity/lib/client";

/**
 * Enables Next.js Draft Mode for Sanity Presentation preview. Requires a
 * configured project and a `SANITY_API_READ_TOKEN` (viewer token); otherwise it
 * responds 501 so the build and route remain valid when preview isn't set up.
 */
const token = process.env.SANITY_API_READ_TOKEN;

export const { GET } =
  client && token
    ? defineEnableDraftMode({ client: client.withConfig({ token }) })
    : { GET: async () => new Response("Draft mode is not configured.", { status: 501 }) };
