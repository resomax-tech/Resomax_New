"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const resoRef = useRef<HTMLHeadingElement>(null);
  const maxRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      resoRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .fromTo(
        maxRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.5" // overlaps animation
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.3"
      );
  }, []);

  return (
    <main className="relative w-full h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      
      {/* MAIN HERO TEXT */}
      <div className="flex flex-col items-center leading-[0.9] text-center">
        
        <h1
          ref={resoRef}
          className="
            font-bold uppercase 
            text-[18vw] md:text-[12vw] lg:text-[8vw]
          "
        >
          RESO
        </h1>

        <h1
          ref={maxRef}
          className="
            font-bold uppercase 
            text-[18vw] md:text-[12vw] lg:text-[8vw]
          "
        >
          MAX
        </h1>
      </div>

      {/* SUBTITLE */}
      <p
        ref={subtitleRef}
        className="mt-6 text-sm md:text-lg tracking-widest opacity-80"
      >
        Branding • Advertising • Marketing
      </p>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-10 text-xs md:text-sm opacity-50 animate-pulse tracking-widest">
        SCROLL ↓
      </div>
    </main>
  );
}
