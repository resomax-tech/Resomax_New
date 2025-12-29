"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Diamond from "./Diamond";

export default function DiamondScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} />

      <Diamond />

      {/* Soft reflections */}
      <Environment preset="city" />
    </Canvas>
  );
}
