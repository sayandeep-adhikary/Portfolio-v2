import { Inter, JetBrains_Mono } from "next/font/google";

// Humanist variable sans — display through body.
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Monospace — reserved for metadata, indices, and technical labels only.
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
