"use client";

import { Canvas } from "@react-three/fiber";

export default function BulbScene() {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 3] }}
    >
      <ambientLight />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
    </Canvas>
  );
}
