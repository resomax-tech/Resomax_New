"use client";

export default function BackgroundImage() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "url('/backgrounds/background1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.7,
        zIndex: 0,
      }}
    />
  );
}
