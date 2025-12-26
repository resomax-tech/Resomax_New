"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
// import LineBackground from "@/app/components/animations/LineBackground";
import FracturedSphere from "@/app/components/backgrounds/FracturedSphere";


export default function MarketingPage() {
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
      {/* <LineBackground /> */}
       <div className="fixed inset-0 z-0 pointer-events-none">
               <FracturedSphere />
             </div>
      <section className="relative z-10 px-6 md:px-24 py-32">
        <div ref={textRef} className="max-w-6xl space-y-20">

          <div className="grid md:grid-cols-2 gap-10">
            <h1 className="text-xl text-white/80">Marketing</h1>
            <p className="text-2xl font-light text-white/85 leading-relaxed">
              We design marketing systems that drive visibility, engagement,
              and sustainable growth across digital channels.
            </p>
          </div>

          {[
            ["Marketing Strategy", "Planning data-driven marketing approaches aligned with business goals."],
            ["Digital Marketing", "Executing campaigns across search, social, and digital platforms."],
            ["Content Marketing", "Creating meaningful content that attracts and retains audiences."],
            ["Social Media Management", "Managing brand presence and engagement across social platforms."],
            ["Paid Advertising (PPC & Social Ads)", "Running targeted ad campaigns for measurable performance."],
            ["Email Marketing", "Building relationships through strategic email communication."],
            ["SEO & Organic Growth", "Improving visibility and traffic through search optimization."],
            ["Analytics & Performance Tracking", "Measuring results and optimizing for growth."],
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
