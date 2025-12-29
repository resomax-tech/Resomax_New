"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface BulbModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BulbModal({ open, onClose }: BulbModalProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open || !mountRef.current) return;

    console.log("Bulb modal mounted");

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ffffff");

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    /* LIGHTS */
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    /* BULB PIECES */
    const group = new THREE.Group();
    scene.add(group);

    for (let i = 0; i < 12; i++) {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(1.6, 0.12, 12, 40, Math.PI / 6),
        new THREE.MeshStandardMaterial({ color: 0x000000 })
      );
      mesh.rotation.z = (i / 12) * Math.PI * 2;
      group.add(mesh);
    }

    /* GEAR */
    const gear = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.18, 16, 40),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    );
    scene.add(gear);

    const animate = () => {
      gear.rotation.z += 0.03;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-white">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-black text-xl"
      >
        ✕
      </button>
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
