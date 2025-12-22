"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import gsap from "gsap";

function FracturedSphereMesh() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();

  const SHARD_COUNT = 180;

  // 1️⃣ Create triangular shard geometry
  const shardGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.25, 0);
    shape.lineTo(0.12, 0.28);
    shape.lineTo(0, 0);

    const geo = new THREE.ShapeGeometry(shape);
    geo.center();
    return geo;
  }, []);

  // 2️⃣ Material
  const shardMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        metalness: 0.9,
        roughness: 0.18,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      }),
    []
  );

  // 3️⃣ Randomly place shards around a sphere
  useMemo(() => {
    for (let i = 0; i < SHARD_COUNT; i++) {
      const radius = 1.8 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      dummy.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      dummy.scale.setScalar(0);

      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    }
  }, [shardGeometry]);

  // 4️⃣ GSAP Intro → shards scale in one by one
  // 4️⃣ GSAP Intro → shards scale in one by one
  useMemo(() => {
    setTimeout(() => {
      if (!meshRef.current) return;

      for (let i = 0; i < SHARD_COUNT; i++) {
        let scaleValue = { value: 0 }; // animate a single value

        gsap.to(scaleValue, {
          value: 1,
          duration: 1.3,
          ease: "power3.out",
          delay: i * 0.01,
          onUpdate: () => {
            if (!meshRef.current) return;  // prevents undefined errors

            dummy.scale.setScalar(scaleValue.value);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
            meshRef.current.instanceMatrix.needsUpdate = true;
          },
        });
      }
    }, 200);
  }, []);


  // 5️⃣ Continuous rotation + slight motion
  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();

    for (let i = 0; i < SHARD_COUNT; i++) {
      meshRef.current.getMatrixAt(i, dummy.matrix);

      dummy.rotation.x += 0.002;
      dummy.rotation.y += 0.003;

      dummy.position.x += Math.sin(t + i) * 0.0015;
      dummy.position.y += Math.cos(t + i * 0.3) * 0.0015;

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[shardGeometry, shardMaterial, SHARD_COUNT]}
    />
  );
}

export default function FracturedSphere() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }}>
        <ambientLight intensity={0.35} />
        <directionalLight intensity={1.5} position={[5, 5, 5]} />

        <FracturedSphereMesh />

        {/* Reflection environment (very important for the glass look) */}
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
