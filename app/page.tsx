"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import FracturedSphere from "./components/3d/FracturedSphere";
import SoftSphere from "./components/3d/SoftSphere";
import DiamondSphere from "./components/3d/DiamondSphere";

export default function Home() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.5 });

    tl.fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 0.7, duration: 1 }, "-=0.6")
      .fromTo(topRef.current, { opacity: 0 }, { opacity: 0.8, duration: 1 }, "-=0.8")
      .fromTo(bottomRef.current, { opacity: 0 }, { opacity: 0.8, duration: 1 }, "-=0.8");
  }, []);

  return (
    <main className="relative w-full h-screen bg-black text-white flex items-center justify-center overflow-hidden">
       {/* <FracturedSphere/> */}
        {/* <SoftSphere /> */}

      {/* Top small text */}
      <p ref={topRef} className="absolute top-10 opacity-0 tracking-[0.2em] text-sm">
        VIEW ALL PROJECTS
      </p>

      {/* Main title */}
      {/* <h1
        ref={titleRef}
        className="absolute text-5xl md:text-7xl font-bold tracking-tight opacity-0"
      >
        RESO MAX
      </h1> */}

      {/* Subtitle */}
      <p ref={subtitleRef} className="absolute bottom-[28%] text-sm opacity-0 tracking-[0.25em]">
        Branding • Advertising • Marketing
      </p>

      {/* Bottom hint */}
      <p ref={bottomRef} className="absolute bottom-10 text-xs opacity-0 tracking-[0.2em]">
        SCROLL ↓
      </p>
    </main>
  );
}
