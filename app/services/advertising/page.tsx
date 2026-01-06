"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function AdvertisingPage() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current.querySelectorAll(".fade-item"),
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1.1,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* ✕ CLOSE BUTTON — BIGGER & CLEAN */}
      <button
        onClick={() => router.push("/")}
        className="
          fixed top-6 right-6 z-50
          w-12 h-12
          flex items-center justify-center
          text-2xl font-light
          text-white/70
          border border-white/15 rounded-full
          hover:text-white hover:border-white/40
          transition-all duration-300
        "
        aria-label="Close and return home"
      >
        ✕
      </button>

      <section className="relative z-10 px-6 md:px-20 lg:px-28 py-28">
        <div
          ref={contentRef}
          className="max-w-6xl mx-auto"
        >

          {/* HEADER BLOCK */}
          <div className="fade-item max-w-4xl mb-28">
            <h1
              className="
                text-5xl md:text-6xl lg:text-7xl
                font-light
                tracking-tight
                leading-tight
                text-[#FFAA17]
                mb-6
              "
            >
              Advertising
            </h1>

            <p className="text-xl md:text-2xl font-light text-white/75 leading-relaxed">
              We plan and execute advertising campaigns that combine creativity,
              strategic media planning, and platform-native execution to deliver
              measurable impact at scale.
            </p>
          </div>

          {/* SERVICES — EDITORIAL LIST */}
          <div className="space-y-16 border-t border-white/10 pt-16">
            {[
              [
                "Advertising Strategy & Media Planning",
                "Defining channels, budgets, and the right media mix for impact.",
              ],
              [
                "Digital Advertising",
                "Search, social, and display campaigns engineered for performance.",
              ],
              [
                "Programmatic & Retargeting",
                "Automated buying with precision audience targeting.",
              ],
              [
                "Video, CTV & YouTube Advertising",
                "High-impact storytelling across premium video platforms.",
              ],
              [
                "Out-of-Home (OOH) Advertising",
                "Large-format physical media for mass visibility.",
              ],
              [
                "Digital Out-of-Home (DOOH)",
                "Dynamic advertising across digital outdoor screens.",
              ],
              [
                "Retail & Point-of-Sale Advertising",
                "In-store communication that drives conversions.",
              ],
              [
                "Creative Ad Design & Copywriting",
                "Visual identity and messaging crafted for campaigns.",
              ],
              [
                "Campaign Analytics & Optimization",
                "Tracking, testing, and refining performance continuously.",
              ],
            ].map(([title, desc], i) => (
              <div
                key={i}
                className="fade-item grid md:grid-cols-12 gap-y-4 gap-x-10"
              >
                {/* INDEX + TITLE */}
                <div className="md:col-span-4 flex gap-4">
                  <span className="text-sm text-white/30 mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl font-light text-[#FFAA17]">
                    {title}
                  </h3>
                </div>

                {/* DESCRIPTION */}
                <p className="md:col-span-8 text-lg text-white/60 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>

        </div>
        <button
        onClick={() => router.push("/")}
        className="fixed top-6 right-6 z-50 w-11 h-11 rounded-full border border-white/40 flex items-center justify-center"
      >
        ✕
      </button>
      </section>
    </main>
  );
}
