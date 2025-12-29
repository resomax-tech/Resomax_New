"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ================= SCENE ================= */

function Scene() {
  const bulbGroup = useRef<THREE.Group>(null);
  const gearGroup = useRef<THREE.Group>(null);

  const { mouse, viewport } = useThree();

  const bulb = useGLTF("/models/bulb.glb");
  const gear = useGLTF("/models/gear.glb");

  /* 🔧 CENTER GEAR PIVOT */
  useEffect(() => {
    gear.scene.traverse((child: any) => {
      if (child.isMesh) {
        child.geometry.center();
        child.material.metalness = 0.9;
        child.material.roughness = 0.25;
        child.material.emissive = new THREE.Color("#ffd700");
        child.material.emissiveIntensity = 0.35;
      }
    });
  }, [gear]);

  /* 🔮 GLASS MATERIAL */
  useEffect(() => {
    bulb.scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material.transparent = true;
        child.material.opacity = 0.22;
        child.material.roughness = 0.05;
        child.material.metalness = 0;
      }
    });
  }, [bulb]);

  /* 🎬 ANIMATION LOOP */
  useFrame((state, delta) => {
    /* ⚙️ GEAR ROTATION — Z AXIS ONLY */
    if (gearGroup.current) {
      gearGroup.current.rotation.z += delta * 0.7;
    }

    /* 🖱️ CURSOR INTERACTION — BULB */
    if (bulbGroup.current) {
      const targetX = mouse.y * 0.25;
      const targetY = mouse.x * 0.35;

      bulbGroup.current.rotation.x = THREE.MathUtils.lerp(
        bulbGroup.current.rotation.x,
        targetX,
        0.06
      );
      bulbGroup.current.rotation.y = THREE.MathUtils.lerp(
        bulbGroup.current.rotation.y,
        targetY,
        0.06
      );

      /* 🌊 Subtle floating */
      bulbGroup.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
    }
  });

  /* 📐 RESPONSIVE SCALE */
  const bulbScale = viewport.width < 6 ? 3.2 : 4.4;
  const gearScale = viewport.width < 6 ? 1.8 : 2.4;

  return (
    <>
      {/* 💡 LIGHTING */}
      <ambientLight intensity={1.1} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} />
      <pointLight position={[0, 0, 3]} intensity={6} color="#ffd9a0" />

      {/* 🌍 REFLECTIONS */}
      <Environment preset="studio" />

      {/* 🔮 BULB GROUP (CURSOR MOVES THIS) */}
      <group ref={bulbGroup} position={[0, -0.3, 0]}>
        <primitive object={bulb.scene} scale={bulbScale} />

        {/* ⚙️ GEAR — CENTERED & ROTATING */}
        <group ref={gearGroup} position={[0, 0.3, 0]}>
          <primitive object={gear.scene} scale={gearScale} />
        </group>
      </group>
    </>
  );
}

/* ================= CANVAS ================= */

export default function BulbInteractive() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
