import type { NextConfig } from "next";

/**
 * Security headers applied to every response. The CSP allows inline styles/
 * scripts (Next's hydration bootstrap, the next-themes pre-paint script, and
 * JSON-LD) and `unsafe-eval` because the embedded Sanity Studio requires it;
 * everything else is locked down (no cross-origin framing, no plugins, no
 * `base` hijacking). Sanity's CDN/API are explicitly allow-listed.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "worker-src 'self' blob:",
  "connect-src 'self' https://*.sanity.io wss://*.api.sanity.io",
  "frame-src 'self' https://*.sanity.io",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Ensure only imported icons ship, not the whole lucide barrel.
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    // Serve modern formats first; AVIF falls back to WebP then original.
    formats: ["image/avif", "image/webp"],
    // Allowed optimizer quality values (showcase imagery uses 90).
    qualities: [75, 90],
    // Only the Sanity image CDN is permitted as a remote source.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
