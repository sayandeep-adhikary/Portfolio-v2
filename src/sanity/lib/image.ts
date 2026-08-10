import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "@/sanity/lib/client";

const builder = client ? createImageUrlBuilder(client) : null;

/** Returns an image URL builder for a Sanity image source, or null when unconfigured. */
export function urlForImage(source: SanityImageSource) {
  return builder ? builder.image(source).auto("format").fit("max") : null;
}
