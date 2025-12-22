"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function MenuOverlay({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  const menuItems = [
    "Home",
    "Branding",
    "Advertising",
    "Marketing",
    "Projects",
    "Contact",
  ];

  return (
    <div
      ref={ref}
      className="fixed inset-0 bg-black bg-opacity-95 z-[99999] flex flex-col justify-center items-center"
    >
      {/* Close Button */}
      <button
        className="absolute top-5 right-5 text-5xl text-white"
        onClick={() => {
          gsap.to(ref.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: onClose,
          });
        }}
      >
        ×
      </button>

      {/* MENU ITEMS */}
      <div className="flex flex-col space-y-6 text-center">
        {menuItems.map((item, idx) => (
          <h1
            key={idx}
            className="text-white text-4xl font-bold tracking-wide hover:text-yellow-400 transition"
          >
            {item}
          </h1>
        ))}
      </div>
    </div>
  );
}
