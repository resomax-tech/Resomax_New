"use client";

export default function BulbOverlay() {
  return (
    <img
      src="/bulb-outline.svg"
      alt="Bulb"
      className="fixed inset-0 m-auto w-[520px] z-20 pointer-events-none"
      style={{
        color: "rgba(190,190,190,0.35)", // glass grey
        filter: `
          drop-shadow(0 0 30px rgba(200,200,200,0.25))
          drop-shadow(0 0 80px rgba(180,180,180,0.12))
        `,
      }}
    />
  );
}
