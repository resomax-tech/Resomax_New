"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Environment } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import gsap from "gsap";

function FracturedSphereMesh() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const groupRef = useRef<THREE.Group>(null);

  const SHARD_COUNT = 180;
  const scales = useMemo(() => new Array(SHARD_COUNT).fill(0), []);

  /* ---------------- BASE TRANSFORMS ---------------- */
  const transforms = useMemo(() => {
    return Array.from({ length: SHARD_COUNT }).map(() => {
      const radius = 1.6 + Math.random() * 0.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      return {
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
      };
    });
  }, []);

  /* ---------------- GEOMETRY ---------------- */
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.22, 0);
    shape.lineTo(0.11, 0.26);
    shape.lineTo(0, 0);

    const geo = new THREE.ShapeGeometry(shape);
    geo.center();
    return geo;
  }, []);

  /* ---------------- MATERIAL ---------------- */
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0a0a0a",
        metalness: 1,
        roughness: 0.15,
        envMapIntensity: 1.4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  /* ---------------- INITIAL STATE ---------------- */
  useEffect(() => {
    const inst = meshRef.current;
    if (!inst) return;

    transforms.forEach((t, i) => {
      dummy.position.copy(t.position);
      dummy.rotation.copy(t.rotation);
      dummy.scale.setScalar(0);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    });

    inst.instanceMatrix.needsUpdate = true;
  }, [transforms]);

  /* ---------------- INTRO ANIMATION ---------------- */
  useEffect(() => {
    const inst = meshRef.current;
    if (!inst) return;

    const tl = gsap.timeline();

    transforms.forEach((t, i) => {
      const scaleObj = { s: 0 };

      tl.to(
        scaleObj,
        {
          s: 1,
          duration: 1.4,
          ease: "power3.out",
          onUpdate: () => {
            scales[i] = scaleObj.s;
            dummy.position.copy(t.position);
            dummy.rotation.copy(t.rotation);
            dummy.scale.setScalar(scaleObj.s);
            dummy.updateMatrix();
            inst.setMatrixAt(i, dummy.matrix);
            inst.instanceMatrix.needsUpdate = true;
          },
        },
        i * 0.008
      );
    });

    return () => {
      tl.kill();
    };
  }, [transforms, scales]);

  /* ---------------- AMBIENT LIFE ---------------- */
  useFrame(({ clock }) => {
    const inst = meshRef.current;
    if (!inst) return;

    const t = clock.getElapsedTime();

    transforms.forEach((base, i) => {
      dummy.position.copy(base.position);
      dummy.rotation.copy(base.rotation);

      dummy.rotation.x += Math.sin(t * 0.25 + i) * 0.0006;
      dummy.rotation.y += Math.cos(t * 0.22 + i) * 0.0006;
      dummy.scale.setScalar(scales[i]);

      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    });

    inst.instanceMatrix.needsUpdate = true;

    // 🔥 GLOBAL GROUP ROTATION (THIS IS KEY)
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={meshRef}
        args={[geometry, material, SHARD_COUNT]}
      />
    </group>
  );
}

/* ---------------- CANVAS WRAPPER ---------------- */
export default function FracturedSphere() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8],   // 🔥 pulled back
        fov: 35,              // 🔥 cinematic FOV
      }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight intensity={2.2} position={[6, 6, 8]} />
      <directionalLight intensity={0.8} position={[-6, -3, -4]} />

      <Environment preset="studio" />

      <FracturedSphereMesh />
    </Canvas>
  );
}
