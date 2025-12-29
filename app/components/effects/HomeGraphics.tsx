"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HomeGraphics() {
  const g1 = useRef<HTMLDivElement>(null);
  const g2 = useRef<HTMLDivElement>(null);
  const g3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 });

    tl.fromTo(
      g1.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 0.35, scale: 1, duration: 2.2, ease: "power2.out" }
    )
      .fromTo(
        g2.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 0.25, scale: 1, duration: 2.2, ease: "power2.out" },
        "-=1.6"
      )
      .fromTo(
        g3.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 0.2, scale: 1, duration: 2.2, ease: "power2.out" },
        "-=1.6"
      );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      
      {/* GRAPHIC 1 */}
      <div
        ref={g1}
        className="absolute -top-40 -left-40 w-[520px] h-[500px] rounded-full blur-[160px]"
        style={{ background: "#FFAA17" }}
      />

      {/* GRAPHIC 2 */}
      <div
        ref={g2}
        className="absolute top-1/3 -right-40 w-[460px] h-[460px] rounded-full blur-[160px]"
        style={{ background: "#6EE7B7" }}
      />

      {/* GRAPHIC 3 */}
      <div
        ref={g3}
        className="absolute bottom-[-120px] left-1/4 w-[420px] h-[420px] rounded-full blur-[160px]"
        style={{ background: "#60A5FA" }}
      />
    </div>
  );
}
