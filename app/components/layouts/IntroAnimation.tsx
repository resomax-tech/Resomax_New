"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function IntroAnimation() {
  const introRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1) Fade + scale RESOMAX text
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 40, scale: 1.1 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
    )
      // 2) Hold
      .to(textRef.current, { opacity: 1, duration: 0.4 })

      // 3) Fade out the text
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power2.inOut",
      })

      // 4) Panel Drop (RESN effect)
      .to(
        panelRef.current,
        {
          y: "100%",
          duration: 1.1,
          ease: "power4.inOut",
        },
        "-=0.3"
      )

      // 5) Remove intro
      .to(introRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.4,
      });
  }, []);

  return (
    <div
      ref={introRef}
      className="fixed inset-0 bg-black z-[9999] flex items-center justify-center overflow-hidden"
    >
      {/* Animated Text */}
      <h1
        ref={textRef}
        className="
          text-white font-bold uppercase tracking-tight
          text-[20vw] md:text-[12vw] lg:text-[8vw]
        "
      >
        RESOMAX
      </h1>

      {/* Animated Drop Panel */}
      <div
        ref={panelRef}
        className="absolute inset-0 bg-white translate-y-[-100%]"
      />
    </div>
  );
}
