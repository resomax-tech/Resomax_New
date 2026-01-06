"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import BulbGearScene from "./BulbGearScene";

const NAV_ITEMS = [
  { label: "Branding", path: "/services/branding" },
  { label: "Marketing", path: "/services/marketing" },
  { label: "Advertising", path: "/services/advertising" },
];

export default function HomeHero() {
  const router = useRouter();
  const [introRunCount, setIntroRunCount] = useState(0);

  // 👂 Listen to intro completion
  useEffect(() => {
    const onIntroComplete = () => {
      setIntroRunCount((v) => v + 1); // force remount
    };

    window.addEventListener("intro:complete", onIntroComplete);
    return () => {
      window.removeEventListener("intro:complete", onIntroComplete);
    };
  }, []);

  // Text animation (optional repeat)
  useEffect(() => {
    gsap.fromTo(
      ".bulb-link",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.25,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.6,
      }
    );
  }, [introRunCount]);

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* 🔹 BULB + GEAR */}
      <div className="absolute inset-0 flex items-center justify-center">
        <BulbGearScene key={introRunCount} />
      </div>

      {/* 🔹 CENTER NAV */}
      <div className="relative z-10 flex flex-col md:flex-row items-center md:gap-14">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => router.push(item.path)}
            className="
              bulb-link
              text-4xl md:text-5xl
              font-light
              tracking-wide
              transition-all duration-300
              hover:opacity-80
              hover:scale-[1.04]
            "
          >
            {item.label}
          </button>
        ))}
      </div>
    </main>
  );
}
