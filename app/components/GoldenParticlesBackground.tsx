"use client";

import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

function Particles() {
  const pointsRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const count = 200; // more particles
    const radius = 8;  // spread area (increase for more coverage)
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Uniform spherical distribution
      const r = Math.cbrt(Math.random()) * radius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }

    return arr;
  }, []);

  useEffect(() => {
    if (!pointsRef.current) return;

    gsap.to(pointsRef.current.rotation, {
      y: Math.PI * 2,
      duration: 180,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <group ref={pointsRef}>
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#CB7611" // rich gold
          size={2}
          opacity={0.6}
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation={false}

        />
      </Points>
    </group>
  );
}

export default function GoldenParticlesBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}




