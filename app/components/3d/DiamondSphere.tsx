"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

function DiamondSphereMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [materialReady, setMaterialReady] = useState(false);

  // Intro animation (scale from 0 → 1)
  useEffect(() => {
    if (!meshRef.current) return;
    gsap.fromTo(
      meshRef.current.scale,
      { x: 0, y: 0, z: 0 },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.4,
        ease: "power3.out",
      }
    );
  }, []);

  // Wobble animation (organic diamond motion)
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    meshRef.current.rotation.y = t * 0.25;
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      {/* High poly sphere for smooth diamond refraction */}
      <icosahedronGeometry args={[1.5, 4]} />

      {/* R3F built-in diamond material */}
      <MeshTransmissionMaterial
        backside
        thickness={1.2}
        roughness={0.05}
        ior={2.4}
        transmission={1}
        chromaticAberration={0.03}
        anisotropy={0.3}
        distortion={0.1}
        distortionScale={0.35}
        temporalDistortion={0.25}
        attenuationColor="#ffffff"
        attenuationDistance={0.5}
      />
    </mesh>
  );
}

export default function DiamondSphere() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 55 }}>
        {/* Lighting for diamond reflections */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} />

        <DiamondSphereMesh />

        {/* Environment reflection (important for diamond shine) */}
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
