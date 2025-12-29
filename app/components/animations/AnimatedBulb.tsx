"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedBulb() {
  const bulbRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bulbRef.current || !glowRef.current) return;

    /* --- ENTRY (silky reveal) --- */
    gsap.fromTo(
      bulbRef.current,
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power3.out",
      }
    );

    /* --- FLOAT (organic drift) --- */
    gsap.to(bulbRef.current, {
      y: -20,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    /* --- MICRO ROTATION (barely noticeable) --- */
    gsap.to(bulbRef.current, {
      rotate: 1.2,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    /* --- GLOW BREATHING --- */
    gsap.to(glowRef.current, {
      opacity: 0.85,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div ref={bulbRef} className="relative">
      {/* Glow Layer */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(255,200,120,0.6), transparent 70%)",
        }}
      />

      {/* Bulb Image */}
      <img
        src="/bulb1.png"
        alt="Innovation Bulb"
        className="relative z-10 w-[500px] md:w-[360px] lg:w-[420px]"
      />
    </div>
  );
}
