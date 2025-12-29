"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Diamond() {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (!ref.current) return;

        // 360-degree continuous rotation
        ref.current.rotation.y += delta * 0.6;
        ref.current.rotation.x += delta * 0.25;
    });

    return (
        // ⬇️ reduced scale
        <mesh ref={ref} scale={0.7}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
                color="#1E1D1F"

                metalness={0.9}
                roughness={0.15}
                envMapIntensity={1.2}
            />
        </mesh>
    );



}


