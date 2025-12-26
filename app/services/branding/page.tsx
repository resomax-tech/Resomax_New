"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
// import LineBackground from "@/app/components/animations/LineBackground";
import FracturedSphere from "@/app/components/backgrounds/FracturedSphere";


export default function BrandingPage() {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0 pointer-events-none">
              <FracturedSphere />
            </div>

      <section className="relative z-10 px-6 md:px-24 py-32">
        <div ref={textRef} className="max-w-6xl space-y-20">

          <div className="grid md:grid-cols-2 gap-10">
            <h1 className="text-xl text-white/80">Branding</h1>
            <p className="text-2xl font-light text-white/85 leading-relaxed">
              We build brands with clarity, purpose, and long-term value.
              Our branding work creates strong foundations that help
              businesses stand out and stay relevant.
            </p>
          </div>

          {[
            ["Brand Strategy", "Defining brand vision, purpose, audience, and competitive positioning."],
            ["Brand Identity Development", "Creating visual and verbal systems that express the brand clearly and consistently."],
            ["Brand Positioning", "Establishing a distinct and meaningful place for the brand in the market."],
            ["Verbal Identity & Messaging", "Crafting tone of voice, messaging frameworks, and narratives."],
            ["Visual Identity & Design", "Designing logos, typography, color systems, and brand assets."],
            ["Brand Guidelines", "Documenting brand rules to ensure consistency across all touchpoints."],
            ["Brand Experience", "Designing how people experience the brand across digital and physical channels."],
            ["Brand Equity Building", "Strengthening trust, recognition, and long-term brand value."],
          ].map(([title, desc], i) => (
            <div key={i} className="grid md:grid-cols-2 gap-10">
              <h3 className="text-lg text-white/70">{title}</h3>
              <p className="text-lg text-white/65 leading-relaxed">{desc}</p>
            </div>
          ))}

        </div>
      </section>
    </main>
  );
}
