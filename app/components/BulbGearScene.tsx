"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

/* ---------- GEAR ---------- */
function Gear() {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/gear.glb");

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#FFD36A", // gold
          metalness: 0.6,
          roughness: 0.3,
        });
      }
    });
  }, [scene]);

  useFrame(() => {
    if (ref.current) ref.current.rotation.z += 0.025;
  });

  return (
    <group ref={ref} position={[0, 0.15, 0]} scale={1.35}>
      <primitive object={scene} scale={0.25} />
    </group>
  );
}

/* ---------- BULB ---------- */
function Bulb() {
  const { scene } = useGLTF("/models/bulb.glb");

  useEffect(() => {
    const materials: THREE.MeshPhysicalMaterial[] = [];

    scene.traverse((child: any) => {
      if (child.isMesh) {
        const mat = new THREE.MeshPhysicalMaterial({
          color: "#ffffff",
          transmission: 0.15,
          opacity: 0, // invisible first
          transparent: true,
          roughness: 0.35,
          thickness: 0.02,
          ior: 1.2,
          clearcoat: 0.6,
          clearcoatRoughness: 0.3,
        });

        child.material = mat;
        materials.push(mat);
      }
    });

    // ⏱️ bulb outer line after 2s
    gsap.to(materials, {
      opacity: 0.25,
      duration: 1.6,
      delay: 2,
      ease: "power2.out",
    });
  }, [scene]);

  return (
    <primitive object={scene} scale={0.4} position={[0, 0.05, 0]} />
  );
}

/* ---------- SCENE ---------- */
export default function BulbGearScene() {
  return (
    <Canvas camera={{ position: [0, 0.1, 4.6], fov: 42 }}>
      <ambientLight intensity={0.6} />
      <Environment preset="city" />

      <Gear />
      <Bulb />
    </Canvas>
  );
}
