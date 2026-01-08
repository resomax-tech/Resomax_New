"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  onLogoCentered: () => void;
  startTexts: boolean;
  onTextsComplete: () => void;
};

export default function Intro3DScene({
  onLogoCentered,
  startTexts,
  onTextsComplete,
}: Props) {
  const logoRef = useRef<HTMLImageElement>(null);
  const resoRef = useRef<HTMLHeadingElement>(null);
  const techRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // LOGO fade in
    gsap.fromTo(
      logoRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.6,
        ease: "power2.out",
        onComplete: onLogoCentered,
      }
    );
  }, [onLogoCentered]);

  useEffect(() => {
    if (!startTexts) return;

    const tl = gsap.timeline({ onComplete: onTextsComplete });

    tl.fromTo(
      resoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" }
    ).fromTo(
      techRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" },
      "+=0.2"
    );
  }, [startTexts, onTextsComplete]);

  return (
    <div className="fixed inset-0 z-90 flex flex-col items-center justify-center bg-black">
      
      {/* LOGO */}
      <img
        ref={logoRef}
        src="/logo2.png"
        alt="ResoMax Logo"
        className="w-80 h-15 mb-10 opacity-0"
      />

      {/* TEXT */}
      {/* <h1   
        ref={resoRef}
        className="opacity-0 text-5xl md:text-6xl tracking-wide text-white"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        RESOMAX
      </h1> */}

      <h2
        ref={techRef}
        className="opacity-0 mt-2 text-sm tracking-[0.5em] text-white/80"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        TECHNOLOGIES
      </h2>
    </div>
  );
}
