"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const teamRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !teamRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll(".fade-section"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      teamRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 75%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <main className="bg-black text-white overflow-hidden relative">

      {/* ✕ CLOSE BUTTON */}
      <button
        onClick={() => router.push("/")}
        aria-label="Close and go home"
        className="
          fixed top-6 right-6 z-50
          w-11 h-11
          flex items-center justify-center
          rounded-full
          border border-white/15
          text-xl font-light
          text-white/70
          hover:text-white
          hover:border-white/40
          transition-all duration-300
          backdrop-blur
        "
      >
        ✕
      </button>

      {/* ================= HERO ================= */}
      <section
        className="
          relative
          h-[55vh] md:h-[50vh]
          flex items-center justify-center
          px-6 md:px-20
        "
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-4xl text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#FFAA17] leading-tight">
            Building Brands with Clarity, Scale & Intent
          </h1>
        </motion.div>
      </section>

      <div ref={containerRef} className="space-y-28">

        {/* ================= ABOUT ================= */}
        <section className="fade-section px-6 md:px-20 pt-28">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16">
            <h2 className="text-4xl md:text-5xl font-light text-[#FFAA17]">
              About ResoMax
            </h2>

            <div className="space-y-4 text-lg text-white/70 leading-relaxed">
              <p>
                ResoMax is a digital-first brand and growth studio focused on
                crafting meaningful brand systems for modern businesses.
              </p>
              <p>
                We work across strategy, creativity, and technology—helping
                brands communicate with clarity and purpose.
              </p>
            </div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section className="fade-section px-6 md:px-20">
          <div className="max-w-6xl mx-auto border-t border-white/10 pt-20">
            <h2 className="text-4xl md:text-5xl font-light text-[#FFAA17] mb-16">
              Our Services
            </h2>

            <div className="space-y-12">
              {[
                ["Branding", "Strategy, positioning, and identity systems."],
                ["Marketing", "Performance-driven digital growth."],
                ["Advertising", "Campaigns engineered for impact."],
              ].map(([title, desc], i) => (
                <div
                  key={i}
                  className="grid md:grid-cols-12 gap-y-3 gap-x-8"
                >
                  <h3 className="md:col-span-4 text-xl font-light text-[#FFAA17]">
                    {title}
                  </h3>
                  <p className="md:col-span-8 text-lg text-white/65 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TEAM ================= */}
        <section className="fade-section px-6 md:px-20 pb-28">
          <div className="max-w-6xl mx-auto border-t border-white/10 pt-20">
            <h2 className="text-4xl md:text-5xl font-light text-[#FFAA17] mb-14">
              Our Team
            </h2>

            <div
              ref={teamRef}
              className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
            >
              {[
                ["Anvesh", "Founder & CEO", "/team/1.jpg"],
                ["Creative Lead", "Design Director", "/team/2.jpg"],
                ["Growth Lead", "Marketing Strategist", "/team/3.jpg"],
              ].map(([name, role, img], i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2"
                >
                  <div className="aspect-square overflow-hidden border border-white/10">
                    <img
                      src={img}
                      alt={name}
                      className="
                        w-full h-full object-cover
                        grayscale hover:grayscale-0
                        transition duration-500
                      "
                    />
                  </div>

                  <div className="leading-tight">
                    <h3 className="text-sm text-[#FFAA17]">{name}</h3>
                    <p className="text-xs text-white/45">{role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
