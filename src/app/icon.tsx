import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

// Brand mark favicon — an "SA" monogram generated from the owner's initials.
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 360,
          height: 360,
          borderRadius: 96,
          background: "#5b63d3",
          color: "#ffffff",
          fontSize: 200,
          fontWeight: 700,
          letterSpacing: -8,
        }}
      >
        SA
      </div>
    </div>,
    { ...size },
  );
}
