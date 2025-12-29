"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

type MenuOverlayProps = {
  onClose: () => void;
};

export default function MenuOverlay({ onClose }: MenuOverlayProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLHeadingElement[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    if (!containerRef.current || itemsRef.current.length === 0) return;

    // Background fade-in
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    // RESN-style floating text
    gsap.fromTo(
      itemsRef.current,
      {
        y: 80,
        x: () => gsap.utils.random(-40, 40),
        opacity: 0,
        rotate: () => gsap.utils.random(-3, 3),
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        rotate: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.25,
      }
    );
  }, []);

  const navigate = (path: string) => {
    // Animate out
    gsap.to(itemsRef.current, {
      y: -40,
      opacity: 0,
      duration: 0.4,
      stagger: 0.06,
      ease: "power3.in",
    });

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.15,
      ease: "power3.in",
      onComplete: () => {
        onClose();
        router.push(path);
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-99999 bg-black/95 flex items-center justify-center"
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-6 right-6 text-white text-5xl font-light opacity-70 hover:opacity-100 transition"
      >
        ×
      </button>

      {/* Menu */}
      <nav className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 text-center">
        {menuItems.map((item, index) => {
          const isDim =
            hoveredIndex !== null && hoveredIndex !== index;

          return (
            <h1
              key={item.label}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                text-white
                text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl
                font-mono
                tracking-wide
                cursor-pointer
                transition-opacity duration-300
                ${isDim ? "opacity-30" : "opacity-100"}
              `}
            >
              {item.label}
            </h1>
          );
        })}
      </nav>
    </div>
  );
}
