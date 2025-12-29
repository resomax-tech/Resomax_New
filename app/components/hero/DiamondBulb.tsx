"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DiamondBulb() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    // micro motion (RESN-style)
    mesh.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    mesh.current.rotation.x = Math.cos(t * 0.15) * 0.08;
  });

  return (
    <mesh ref={mesh} position={[0, 0.2, 0]}>
      {/* Lathe creates a bulb-like profile */}
      <latheGeometry
        args={[
          [
            new THREE.Vector2(0, -1.8),
            new THREE.Vector2(0.9, -1.2),
            new THREE.Vector2(1.3, 0),
            new THREE.Vector2(1.1, 1.2),
            new THREE.Vector2(0.3, 1.9),
          ],
          16, // facets count (lower = more diamond)
        ]}
      />

      {/* Crystal material */}
      <meshPhysicalMaterial
        transmission={1}      // glass
        thickness={0.6}
        roughness={0.15}
        ior={1.4}
        clearcoat={1}
        clearcoatRoughness={0.1}
        color="#cfe8ff"
      />
    </mesh>
  );
}
