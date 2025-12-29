"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function BulbModal({ open, onClose }: any) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open || !mountRef.current) return;

    /* ---------------- Scene ---------------- */
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    /* ---------------- Lights ---------------- */
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    /* ---------------- Mouse ---------------- */
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* =================================================
       BULB GROUP
    ================================================= */
    const bulbGroup = new THREE.Group();
    scene.add(bulbGroup);

    const pieceMat = new THREE.MeshStandardMaterial({
      color: 0x000000,
      metalness: 0.3,
      roughness: 0.35,
    });

    const pieces: THREE.Mesh[] = [];

    for (let i = 0; i < 14; i++) {
      const geo = new THREE.TorusGeometry(2.3, 0.1, 12, 40, Math.PI / 6);
      const mesh = new THREE.Mesh(geo, pieceMat);

      mesh.rotation.z = (i / 14) * Math.PI * 2;
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5
      );

      bulbGroup.add(mesh);
      pieces.push(mesh);
    }

    // Assemble animation
    gsap.to(pieces.map(p => p.position), {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.8,
      ease: "power4.out",
      stagger: 0.05,
    });

    /* =================================================
       GEAR
    ================================================= */
    const gear = new THREE.Mesh(
      new THREE.TorusGeometry(0.6, 0.18, 16, 64),
      new THREE.MeshStandardMaterial({
        color: 0x000000,
        metalness: 0.5,
        roughness: 0.3,
      })
    );
    scene.add(gear);

    /* ---------------- Animation Loop ---------------- */
    const animate = () => {
      // Smooth mouse lerp (RESN-style inertia)
      mouse.x += (target.x - mouse.x) * 0.08;
      mouse.y += (target.y - mouse.y) * 0.08;

      // Bulb parallax
      bulbGroup.rotation.y = mouse.x * 0.4;
      bulbGroup.rotation.x = mouse.y * 0.3;

      // Subtle depth shift
      bulbGroup.position.x = mouse.x * 0.4;
      bulbGroup.position.y = mouse.y * 0.3;

      // Micro motion per piece
      pieces.forEach((p, i) => {
        p.rotation.z += 0.0005 * (i + 1);
      });

      // Gear motion
      gear.rotation.z += 0.03;
      gear.rotation.x = mouse.y * 0.15;
      gear.rotation.y = mouse.x * 0.15;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    /* ---------------- Resize ---------------- */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    /* ---------------- Cleanup ---------------- */
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
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
      <div ref={mountRef} className="w-full h-full cursor-none" />
    </div>
  );
}
