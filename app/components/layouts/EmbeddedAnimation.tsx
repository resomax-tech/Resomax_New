"use client";

export default function EmbeddedAnimation() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <iframe
        src="https://codepen.io/zadvorsky/embed/BKJQep?default-tab=result"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allowFullScreen
      ></iframe>
    </div>
  );
}
