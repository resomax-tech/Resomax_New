"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function GearFragments() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.2) * 0.15;
      group.current.rotation.x = Math.cos(t * 0.15) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 18 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i) * 1.2,
            Math.cos(i) * 1.2,
            Math.random() * 0.4,
          ]}
          rotation={[Math.random(), Math.random(), Math.random()]}
        >
          <boxGeometry args={[0.3, 0.6, 0.1]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.3}
            metalness={0.8}
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function BulbScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ position: "fixed", inset: 0, zIndex: -1 }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 3, 3]} intensity={1} />

      {/* Gear-like fractured core */}
      <GearFragments />
    </Canvas>
  );
}
