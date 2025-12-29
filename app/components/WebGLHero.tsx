"use client";

import dynamic from "next/dynamic";

const BulbScene = dynamic(
  () => import("./backgrounds/BulbScene"),
  { ssr: false }
);

export default function WebGLHero() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "black",
        zIndex: 10,
      }}
    >
      <BulbScene />
    </div>
  );
}
