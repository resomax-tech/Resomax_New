"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

import FluidNav from "./components/effects/FluidNav";
import MainNavbar from "./components/layouts/Mainnavbar";
import AnimatedBulb from "./components/animations/AnimatedBulb";

const NAV_ITEMS = [
  { label: "Branding", path: "/services/branding" },
  { label: "Marketing", path: "/services/marketing" },
  { label: "Advertising", path: "/services/advertising" },
];

export default function Home() {
  const router = useRouter();
  const itemsRef = useRef<HTMLButtonElement[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  /* 🔹 INTRO ANIMATION */
  useEffect(() => {
    gsap.set(itemsRef.current, {
      opacity: 0,
      y: 18,
    });

    gsap.to(itemsRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.3,
      ease: "power2.out",
      stagger: 0.35,
      delay: 0.6,
    });
  }, []);

  const handleClick = (index: number, path: string) => {
    setActiveIndex(index);

    gsap.to(itemsRef.current[index], {
      scale: 0.96,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
      onComplete: () => router.push(path),
    });
  };

  return (
    <main className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* BACKGROUND EFFECT */}
      <FluidNav />

      {/* BULB BACKGROUND */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <AnimatedBulb />
      </div>

      {/* LOGO */}
      <img
        src="/logo.png"
        alt="Resomax Logo"
        className="
          fixed top-6 left-6
          w-12 md:w-14
          z-20
          pointer-events-none
          select-none
        "
      />

      {/* 🔥 CENTERED GLASS BUTTONS */}
      {/* 🔥 CENTERED NAV ITEMS (NO GLASS) */}
      {/* 🔥 CENTERED NAV ITEMS (RESPONSIVE) */}
      <div
        className="
    absolute inset-0
    flex items-center justify-center
    z-10
  "
      >
        <div
          className="
      flex flex-col
      md:flex-row
      items-center
      gap-6 md:gap-10
    "
        >
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.label}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              onClick={() => handleClick(i, item.path)}
              className={`
          text-white
          text-5xl md:text-5xl
          font-light
          transition-opacity duration-300
          hover:opacity-70
          ${activeIndex !== null && activeIndex !== i
                  ? "opacity-30"
                  : "opacity-90"
                }
        `}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>


      {/* NAVBAR */}
      <MainNavbar />
    </main>
  );
}
