import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social card, generated at build/request time — no static asset needed.
export default function OpenGraphImage() {
  const host = siteConfig.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0b0c0e",
        padding: "80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            background: "#5b63d3",
            borderRadius: 12,
            color: "#ffffff",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            fontFamily: "sans-serif",
          }}
        >
          SA
        </div>
        <span
          style={{
            color: "#f5f5f4",
            fontSize: 30,
            letterSpacing: "0.02em",
            fontFamily: "monospace",
          }}
        >
          {siteConfig.name.toLowerCase()}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          color: "#f5f5f4",
          fontSize: 68,
          lineHeight: 1.15,
          fontWeight: 600,
          maxWidth: "960px",
          letterSpacing: "-0.02em",
        }}
      >
        {siteConfig.description}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: "32px",
        }}
      >
        <span style={{ color: "#8a8a94", fontSize: 28, fontFamily: "monospace" }}>{host}</span>
        <span style={{ color: "#8a8a94", fontSize: 28, fontFamily: "monospace" }}>
          {siteConfig.jobTitle}
        </span>
      </div>
    </div>,
    { ...size },
  );
}
