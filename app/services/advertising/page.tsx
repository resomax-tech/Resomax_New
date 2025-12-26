"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
// import LineBackground from "@/app/components/animations/LineBackground";
import FracturedSphere from "@/app/components/backgrounds/FracturedSphere";


export default function AdvertisingPage() {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!textRef.current) return;
    gsap.fromTo(
      textRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 1.2 }
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
            <h1 className="text-xl text-white/80">Advertising</h1>
            <p className="text-2xl font-light text-white/85 leading-relaxed">
              We plan and execute advertising campaigns that combine creativity,
              reach, and measurable performance.
            </p>
          </div>

          {[
            ["Advertising Strategy & Media Planning", "Defining channels, budgets, and media mix."],
            ["Digital Advertising", "Search, social, and display advertising campaigns."],
            ["Programmatic & Retargeting", "Automated buying and audience retargeting."],
            ["Video, CTV & YouTube Advertising", "High-impact video advertising across platforms."],
            ["Out-of-Home (OOH) Advertising", "Billboards and physical media campaigns."],
            ["Digital Out-of-Home (DOOH)", "Dynamic advertising across digital outdoor screens."],
            ["Retail & Point-of-Sale Advertising", "In-store communication and conversion-focused media."],
            ["Creative Ad Design & Copywriting", "Developing visuals and messaging for campaigns."],
            ["Campaign Analytics & Optimization", "Tracking, testing, and improving ad performance."],
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
