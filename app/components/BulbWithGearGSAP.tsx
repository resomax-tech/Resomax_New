"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BulbWithGearGSAP() {
  const gearRef = useRef<HTMLDivElement>(null);
  const bulbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gearRef.current || !bulbRef.current) return;

    /* 🔁 Gear rotation */
    gsap.to(gearRef.current, {
      rotate: 360,
      duration: 8,
      ease: "linear",
      repeat: -1,
    });

    /* ✨ Bulb glow breathing */
    gsap.to(bulbRef.current, {
      boxShadow:
        "inset 0 0 60px rgba(255,255,255,0.25), 0 0 120px rgba(255,255,255,0.25)",
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });

    /* 🪶 Slow floating */
    gsap.to(bulbRef.current, {
      y: -14,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className="bulb-wrapper">
      <div ref={bulbRef} className="bulb-glass">
        <div ref={gearRef} className="gear" />
      </div>
    </div>
  );
}
