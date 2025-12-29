"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function BulbScene() {
  const gearRef = useRef<THREE.Group | null>(null);
  const { viewport } = useThree();

  const bulb = useGLTF("/models/bulb.glb") as any;
  const gear = useGLTF("/models/gear.glb") as any;

  // constant loader spin speed (radians per second)
  const SPIN_SPEED = 1.8;

  useFrame((_, delta) => {
    if (gearRef.current) {
      // rotate only — gear stays exactly where it's placed
      gearRef.current.rotation.z += delta * SPIN_SPEED;
    }
  });

  const bulbScale = 25;
  const gearScale = viewport.width < 6 ? 0.5 : 1.0;

  // glass tuning (optional)
  bulb.scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material.transparent = true;
      child.material.opacity = 0.28;
      child.material.roughness = 0.08;
      child.material.metalness = 0;
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} />
      <pointLight position={[0, 0, 4]} intensity={4} color="#ffd9a0" />
      <Environment preset="studio" />

      {/* Bulb - keep its original position */}
      <primitive object={bulb.scene} scale={bulbScale} position={[0, -2, 0]} />

      {/* Gear - centered (no translation), rotates in place */}
      <primitive ref={gearRef} object={gear.scene} scale={gearScale} position={[0, 0, 0]} />
    </>
  );
}

export default function BulbWithGear() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} style={{ width: "100%", height: "100%" }} dpr={[1, 2]}>
        <BulbScene />
      </Canvas>
    </div>
  );
}