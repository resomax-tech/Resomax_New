"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function FluidNav() {
  useEffect(() => {
    const items = () =>
      gsap.utils.toArray<HTMLElement>(".fluid-nav");

    const onMove = (e: MouseEvent) => {
      items().forEach((item) => {
        const rect = item.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const max = 260;

        if (dist < max) {
          gsap.to(item, {
            x: dx * 0.08,
            y: dy * 0.08,
            duration: 0.6,
            ease: "power3.out",
          });
        } else {
          gsap.to(item, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          });
        }
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}
