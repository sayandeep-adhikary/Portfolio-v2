import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

// Brand mark favicon — generated so no static asset is required.
// The diamond is drawn as a rotated square (no glyph) to avoid a font download.
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0c0e",
      }}
    >
      <div
        style={{
          width: 220,
          height: 220,
          background: "#5b63d3",
          borderRadius: 28,
          transform: "rotate(45deg)",
        }}
      />
    </div>,
    { ...size },
  );
}
