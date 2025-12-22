// app/components/3d/TextToSphere.tsx
"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import gsap from "gsap";

type Props = {
  text?: string;
  particleSize?: number;
  sphereRadius?: number;
};

export default function TextToSphere({
  text = "RESO MAX",
  particleSize = 0.04,
  sphereRadius = 2.2,
}: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <MorphingTextScene
          text={text}
          particleSize={particleSize}
          sphereRadius={sphereRadius}
        />
      </Canvas>
    </div>
  );
}

function MorphingTextScene({
  text = "RESO MAX",
  particleSize,
  sphereRadius,
}: Props) {
  // Load font from public folder
  const font = useLoader(FontLoader, "/fonts/helvetiker_bold.typeface.json");

  // Build start and end position arrays once (when font & text change)
  const { startPositions, endPositions, vertexCount } = useMemo(() => {
    const safeSphereRadius = sphereRadius ?? 2.2; // fallback default
    // create TextGeometry
    const geom = new TextGeometry(text, {
      font,
      size: 2.0,
      depth: 0.1, // modern param name
      curveSegments: 12,
      bevelEnabled: false,
    });

    // center text
    geom.center();

    // ensure non-indexed so we can use position array directly
    const buffer = geom.toNonIndexed();
    const posAttr = buffer.getAttribute("position") as THREE.BufferAttribute;
    const count = posAttr.count;

    // start positions: copy existing position array
    const start = new Float32Array(posAttr.array.length);
    start.set(posAttr.array as Float32Array);

    // end positions: fibonacci sphere (same count)
    const end = new Float32Array(posAttr.array.length);
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // fibonacci sphere distribution
      const t = i / count;
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = safeSphereRadius * (0.95 + Math.random() * 0.1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      end[idx + 0] = x;
      end[idx + 1] = y;
      end[idx + 2] = z;
    }

    // cleanup geometry memory (we created new geometry objects)
    geom.dispose();
    buffer.dispose();

    return { startPositions: start, endPositions: end, vertexCount: count };
  }, [font, text, sphereRadius]);

  return (
    <PointsMorph
      startPositions={startPositions}
      endPositions={endPositions}
      vertexCount={vertexCount}
      particleSize={particleSize}
    />
  );
}

function PointsMorph({
  startPositions,
  endPositions,
  vertexCount,
  particleSize = 0.04,
}: {
  startPositions: Float32Array;
  endPositions: Float32Array;
  vertexCount: number;
  particleSize?: number;
}) {
  const pointsRef = useRef<THREE.Points | null>(null);
  const positionsRef = useRef<Float32Array | null>(null);
  const progressRef = useRef(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Initialize geometry and mutable positions array
  useEffect(() => {
    // clone start positions so we can mutate per frame
    const mutable = new Float32Array(startPositions.length);
    mutable.set(startPositions);
    positionsRef.current = mutable;

    // build buffer geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(mutable, 3));

    // optional small size attribute
    const sizes = new Float32Array(vertexCount);
    for (let i = 0; i < vertexCount; i++) sizes[i] = 0.6 + Math.random() * 0.8;
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    if (pointsRef.current) {
      // dispose old geometry safely
      pointsRef.current.geometry.dispose();
      pointsRef.current.geometry = geometry;
    }

    return () => {
      // cleanup geometry on unmount
      if (pointsRef.current && pointsRef.current.geometry) {
        pointsRef.current.geometry.dispose();
      } else {
        geometry.dispose();
      }
      // kill tween if exists
      if (tweenRef.current) tweenRef.current.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startPositions, vertexCount]);

  // Create GSAP looped tween (0 -> 1 -> 0)
  useEffect(() => {
    const animObj = { t: 0 };
    tweenRef.current = gsap.to(animObj, {
      t: 1,
      duration: 3.0,
      ease: "power3.inOut",
      repeat: -1,
      yoyo: true,
      onUpdate: () => {
        progressRef.current = animObj.t;
      },
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
      tweenRef.current = null;
    };
  }, []);

  // Per-frame interpolation: update mutable positions toward end
  useFrame(() => {
    const geom = pointsRef.current?.geometry as THREE.BufferGeometry | undefined;
    const positions = positionsRef.current;
    if (!geom || !positions) return;

    const start = startPositions;
    const end = endPositions;
    const p = progressRef.current;

    // interpolate all components
    for (let i = 0; i < positions.length; i++) {
      positions[i] = start[i] * (1 - p) + end[i] * p;
    }

    geom.attributes.position.needsUpdate = true;

    // subtle rotation
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0025;
      pointsRef.current.rotation.x += 0.0008;
    }
  });

  return (
    <points ref={pointsRef}>
      {/* initial geometry to avoid render flicker */}
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[startPositions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={particleSize}
        sizeAttenuation
        color={"#FFFFFF"}
        opacity={0.95}
        transparent
      />
    </points>
  );
}
