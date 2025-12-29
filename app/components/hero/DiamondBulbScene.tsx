"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import DiamondBulb from "./DiamondBulb";
import InnerGear from "./InnerGear";

export default function DiamondBulbScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
      }}
    >
      {/* Soft ambient */}
      <ambientLight intensity={0.3} />

      {/* Key light (defines facets) */}
      <directionalLight position={[4, 6, 3]} intensity={1.2} />

      {/* Rim light */}
      <directionalLight position={[-4, -3, 2]} intensity={0.8} />

      {/* Diamond bulb shell */}
      <DiamondBulb />

      {/* Mechanical intelligence */}
      <InnerGear />

      {/* Studio-style reflections */}
      <Environment preset="studio" />
    </Canvas>
  );
}
