"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

/** Client boundary that mounts the embedded Sanity Studio. */
export function StudioMount() {
  return <NextStudio config={config} />;
}
