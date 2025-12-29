"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";


export default function ContactBackground() {
  const layer1 = useRef<HTMLDivElement | null>(null);
  const layer2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!layer1.current || !layer2.current) return;

    gsap.to(layer1.current, {
      x: "-10%",
      y: "8%",
      duration: 30,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(layer2.current, {
      x: "12%",
      y: "-6%",
      duration: 40,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Layer 1 */}
      <div
        ref={layer1}
        className="
          absolute
          -top-1/3 -left-1/3
          w-[120%] h-[120%]
          bg-[radial-gradient(circle_at_center,rgba(120,124,255,0.25),transparent_60%)]
          blur-3xl
        "
      />

      {/* Layer 2 */}
      <div
        ref={layer2}
        className="
          absolute
          -bottom-1/3 -right-1/3
          w-[120%] h-[120%]
          bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.18),transparent_60%)]
          blur-3xl
        "
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />
    </div>
  );
}
