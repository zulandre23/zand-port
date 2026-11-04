import { ImageResponse } from "next/og";

export const alt = "ZAND portfolio — Fullstack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#071012",
          color: "#ecf8f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ color: "#38d6cb", fontSize: 24, letterSpacing: 10 }}>
          PORTFOLIO / DEVELOPER
        </div>
        <div style={{ marginTop: 24, fontSize: 100, fontWeight: 700 }}>
          ZAND
        </div>
        <div style={{ marginTop: 12, color: "#a4b8b8", fontSize: 38 }}>
          Fullstack Developer
        </div>
      </div>
    ),
    size
  );
}
