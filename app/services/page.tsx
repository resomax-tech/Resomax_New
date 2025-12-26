"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Branding",
    desc: "Brand strategy, identity systems, positioning, and experiences that define how brands are remembered.",
    href: "/services/branding",
    bg: "/services/branding.jpg",
  },
  {
    title: "Marketing",
    desc: "Digital marketing, content, SEO, and growth strategies designed for long-term traction.",
    href: "/services/marketing",
    bg: "/services/marketing.jpg",
  },
  {
    title: "Advertising",
    desc: "Performance advertising, media planning, and creative executions across digital channels.",
    href: "/services/advertising",
    bg: "/services/advertising2.jpg",
  },
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const panels = panelsRef.current;

    gsap.set(panels, { yPercent: 100 });
    gsap.set(panels[0], { yPercent: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${panels.length * window.innerHeight}`,
      },
    });

    panels.forEach((panel, i) => {
      if (i === 0) return;

      tl.to(panels[i - 1], { yPercent: -100, ease: "none" })
        .to(panel, { yPercent: 0, ease: "none" }, "<");
    });

    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <main className="bg-black text-white">
      <section
        ref={containerRef}
        className="relative h-screen overflow-hidden"
      >
        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/60 text-sm tracking-wide">
          Scroll ↓
        </div>

        {services.map((service, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) panelsRef.current[i] = el;
            }}
            className="absolute inset-0"
          >
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${service.bg})` }}
            />
            <div className="absolute inset-0 bg-black/60" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-24">
              <Link href={service.href} className="inline-block max-w-xl">
                <h2 className="text-4xl md:text-5xl font-light mb-6 hover:opacity-80 transition">
                  {service.title}
                </h2>
                <p className="text-lg md:text-xl text-white/80 hover:text-white transition">
                  {service.desc}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
