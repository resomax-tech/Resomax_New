"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function InnerGear() {
  const gear = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!gear.current) return;
    gear.current.rotation.z = clock.getElapsedTime() * 0.3; // slow
  });

  return (
    <mesh ref={gear} position={[0, 0, 0]}>
      <torusGeometry args={[0.9, 0.18, 16, 12]} />
      <meshStandardMaterial
        metalness={0.8}
        roughness={0.3}
        color="#aaaaaa"
      />
    </mesh>
  );
}
