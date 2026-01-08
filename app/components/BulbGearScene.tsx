"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useEffect, useRef, Suspense,useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

/* ================= SIZE CONFIG ================= */
const SCENE_SIZES = {
  desktop: { gearScale: 1.9, gearY: 0.6, bulbScale: 0.5, bulbY: 0.4 },
  tablet: { gearScale: 1.5, gearY: 0.55, bulbScale: 0.45, bulbY: 0.35 },
  mobile: { gearScale: 1.7, gearY: 0.65, bulbScale: 0.4, bulbY: 0.5 },
};


/* ---------- GEAR ---------- */
function Gear({ scale, y }: { scale: number; y: number }) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/gear.glb");

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#CB7611",
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
    <group ref={ref} position={[0, y, 0]} scale={scale}>
      <primitive object={scene} scale={0.25} />
    </group>
  );
}

/* ---------- BULB ---------- */
function Bulb({
  scale,
  y,
  interactive,
}: {
  scale: number;
  y: number;
  interactive: boolean;
}) {
  const bulbRef = useRef<THREE.Group>(null);
  const materials = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const { scene } = useGLTF("/models/bulb.glb");
  const [touched, setTouched] = useState(false);


  useEffect(() => {
    materials.current = [];

    scene.traverse((child: any) => {
      if (child.isMesh) {
        const mat = new THREE.MeshPhysicalMaterial({
          color: "#252C2D",
          transmission: 0.15,
          opacity: 0,
          transparent: true,
          roughness: 0.35,
          thickness: 0.02,
          ior: 1.2,
          clearcoat: 0.6,
          clearcoatRoughness: 0.3,
          emissive: new THREE.Color("#28150C"),
          emissiveIntensity: 0,
        });

        child.material = mat;
        materials.current.push(mat);
      }
    });

    // initial fade-in (existing behavior preserved)
    gsap.to(materials.current, {
      opacity: 0.25,
      duration: 1.6,
      delay: 2,
      ease: "power2.out",
    });
  }, [scene]);

  // light up when interactive
  useEffect(() => {
    if (!interactive) return;

    gsap.to(materials.current, {
      emissiveIntensity: 1.4,
      opacity: 0.35,
      duration: 1.2,
      ease: "power3.out",
    });
  }, [interactive]);

  // cursor interaction
  useFrame(({ pointer }) => {
  if (!interactive || !touched || !bulbRef.current) return;

  bulbRef.current.rotation.y = THREE.MathUtils.lerp(
    bulbRef.current.rotation.y,
    pointer.x * 0.8,
    0.08
  );

  bulbRef.current.rotation.x = THREE.MathUtils.lerp(
    bulbRef.current.rotation.x,
    pointer.y * 0.6,
    0.08
  );
});



  return (
    <group
      ref={bulbRef}
      scale={scale}
      position={[0, y, 0]}
      onPointerEnter={() => interactive && (document.body.style.cursor = "pointer")}
      onPointerLeave={() => (document.body.style.cursor = "default")}
      onPointerDown={() => {
        if (!interactive) return;

        setTouched(true); // ✅ ENABLE ROTATION

        gsap.to(bulbRef.current!.scale, {
          x: scale * 1.05,
          y: scale * 1.05,
          z: scale * 1.05,
          duration: 0.25,
          ease: "power2.out",
        });
      }}

      onPointerUp={() => {
        gsap.to(bulbRef.current!.scale, {
          x: scale,
          y: scale,
          z: scale,
          duration: 0.3,
          ease: "power2.out",
        });
      }}

    >
      <primitive object={scene} />
    </group>
    
  );
}

/* ---------- RESPONSIVE ---------- */
function SceneContent({ interactive }: { interactive: boolean }) {
  const { viewport } = useThree();

  let size = SCENE_SIZES.desktop;
  if (viewport.width < 3.5) size = SCENE_SIZES.mobile;
  else if (viewport.width < 6) size = SCENE_SIZES.tablet;

  return (
    <>
      <Gear scale={size.gearScale} y={size.gearY} />
      <Bulb
        scale={size.bulbScale}
        y={size.bulbY}
        interactive={interactive}
      />
    </>
  );
}

/* ---------- MAIN ---------- */
export default function BulbGearScene({
  interactive,
}: {
  interactive: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.1, 4.6], fov: 42 }}
      gl={{ alpha: true, preserveDrawingBuffer: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <ambientLight intensity={0.6} />
      <Suspense fallback={null}>
        <Environment preset="city" />
        <SceneContent interactive={interactive} />
      </Suspense>
    </Canvas>
  );
}

/* ---------- PRELOAD ---------- */
useGLTF.preload("/models/gear.glb");
useGLTF.preload("/models/bulb.glb");
