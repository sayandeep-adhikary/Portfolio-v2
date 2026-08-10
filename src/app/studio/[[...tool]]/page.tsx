import Link from "next/link";

import { hasSanityConfig } from "@/sanity/lib/env";

import { StudioMount } from "./studio-mount";

export const dynamic = "force-static";

export const metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (!hasSanityConfig) {
    return (
      <main
        style={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "#0b0c0e",
          color: "#f5f5f4",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ maxWidth: "32rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", color: "#8a8a94" }}>
            Studio
          </p>
          <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>
            Sanity is not configured
          </h1>
          <p style={{ margin: 0, color: "#b5b5bd", lineHeight: 1.6 }}>
            Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and optionally{" "}
            <code>NEXT_PUBLIC_SANITY_DATASET</code>) in your environment, then rebuild to edit
            content here. Until then the site renders from local fallback content.
          </p>
          <Link href="/" style={{ color: "#8b93e3", textDecoration: "underline" }}>
            Back to site
          </Link>
        </div>
      </main>
    );
  }

  return <StudioMount />;
}
