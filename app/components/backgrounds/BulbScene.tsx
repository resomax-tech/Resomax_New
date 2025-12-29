"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

/* ---------- GEAR ---------- */
function Gear() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) ref.current.rotation.z += 0.012;
  });

  return (
    <mesh ref={ref} position={[0, 0.25, 0]}>
      <torusGeometry args={[0.7, 0.2, 32, 24]} />
      <meshStandardMaterial
        color="#f2c97d"
        metalness={0.9}
        roughness={0.22}
      />
    </mesh>
  );
}

/* ---------- GLOW CORE ---------- */
function GlowCore() {
  return (
    <mesh position={[0, 0.15, 0]}>
      <sphereGeometry args={[0.22, 32, 32]} />
      <meshStandardMaterial
        emissive="#ffcc88"
        emissiveIntensity={6}
        color="black"
      />
    </mesh>
  );
}

/* ---------- GLASS BULB ---------- */
function BulbGlass() {
  return (
    <mesh>
      <sphereGeometry args={[1.25, 64, 64]} />
      <meshPhysicalMaterial
        transparent
        transmission={0.95}
        thickness={0.9}
        roughness={0}
        ior={1.45}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </mesh>
  );
}

/* ---------- BULB BASE ---------- */
function BulbBase() {
  return (
    <mesh position={[0, -1.15, 0]}>
      <cylinderGeometry args={[0.35, 0.45, 0.5, 32]} />
      <meshStandardMaterial
        color="#1a1a1a"
        metalness={0.9}
        roughness={0.3}
      />
    </mesh>
  );
}

/* ---------- FLOATING PARTICLES ---------- */
function Particles() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 1.2,
            Math.random() * 0.8,
            (Math.random() - 0.5) * 1.2,
          ]}
        >
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial
            emissive="#ffddaa"
            emissiveIntensity={3}
            color="black"
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- CAMERA DRIFT ---------- */
function CameraDrift() {
  useFrame(({ camera, clock }) => {
    camera.position.x = Math.sin(clock.elapsedTime * 0.2) * 0.1;
    camera.position.y = Math.cos(clock.elapsedTime * 0.2) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ---------- SCENE ---------- */
export default function BulbScene() {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 3], fov: 45 }}
    >
      {/* LIGHTS */}
      <ambientLight intensity={1.4} />
      <directionalLight position={[5, 5, 5]} intensity={4} />
      <pointLight position={[0, 0.4, 1]} intensity={6} color="#ffcc88" />

      {/* EFFECTS */}
      <CameraDrift />

      {/* OBJECTS */}
      <Gear />
      <GlowCore />
      <Particles />
      <BulbGlass />
      <BulbBase />
    </Canvas>
  );
}
