"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function Bulb() {
  const bulb = useGLTF("/models/bulb.glb");

  return (
    <primitive
      object={bulb.scene}
      scale={5}          // 🔴 BIG on purpose
      position={[0, -1, 0]}
    />
  );
}

export default function BulbDebug() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "black" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* STRONG LIGHTS */}
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={3} />
        <pointLight position={[0, 0, 5]} intensity={5} />

        <Bulb />
      </Canvas>
    </div>
  );
}
