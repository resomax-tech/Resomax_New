"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

type Item = {
  title: string;
  desc: string;
  image: string;
};

const ITEMS: Item[] = [
  {
    title: "Brand Strategy",
    desc: "Defining vision, purpose, audience, and competitive positioning.",
    image: "/branding/strategy.webp",
  },
  {
    title: "Brand Identity Development",
    desc: "Creating visual and verbal systems that express the brand clearly.",
    image: "/branding/development.webp",
  },
  {
    title: "Brand Positioning",
    desc: "Establishing a meaningful and differentiated place in the market.",
    image: "/branding/positioning.webp",
  },
  {
    title: "Verbal Identity & Messaging",
    desc: "Shaping perception and creating long-term brand value.",
    image: "/branding/messaging.webp",
  },
  {
    title: "Visual Identity & Design",
    desc: "Designing logos, typography, color systems, and brand assets.",
    image: "/branding/strategy.webp",
  },
  {
    title: "Brand Guidelines",
    desc: "Ensuring consistency across every brand touchpoint.",
    image: "/branding/guidlines.webp",
  },
  {
    title: "Brand Experience",
    desc: "Designing meaningful interactions across channels.",
    image: "/branding/experience.webp",
  },
  {
    title: "Brand Equity Building",
    desc: "Building trust, recognition, and long-term value.",
    image: "/branding/strategy.webp",
  },
];

export default function BrandingPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);

  /* ---------------- GSAP ---------------- */
  useEffect(() => {
    if (!containerRef.current || !slidesRef.current) return;

    const slides = gsap.utils.toArray<HTMLElement>(
      slidesRef.current.children
    );

    slides.forEach((slide, i) => {
      const text = slide.querySelector(".slide-text");
      const image = slide.querySelector(".slide-image");

      gsap.set(slide, { autoAlpha: i === 0 ? 1 : 0 });
      gsap.set(text, { y: 40, opacity: i === 0 ? 1 : 0 });
      gsap.set(image, { scale: 1.05, opacity: i === 0 ? 1 : 0 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${slides.length * 120}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    slides.forEach((slide, i) => {
      if (i === 0) return;

      const prev = slides[i - 1];
      const prevText = prev.querySelector(".slide-text");
      const prevImage = prev.querySelector(".slide-image");

      const nextText = slide.querySelector(".slide-text");
      const nextImage = slide.querySelector(".slide-image");

      tl.to(prevText, { y: -40, opacity: 0, duration: 0.4 })
        .to(prevImage, { opacity: 0, scale: 0.98, duration: 0.4 }, "<")
        .set(prev, { autoAlpha: 0 })
        .set(slide, { autoAlpha: 1 })
        .fromTo(nextText, { y: 40, opacity: 0 }, { y: 0, opacity: 1 })
        .fromTo(
          nextImage,
          { scale: 1.05, opacity: 0 },
          { scale: 1, opacity: 1 },
          "<"
        );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* ---------------- UI ---------------- */
  return (
    <main className="relative bg-black text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative h-[55vh] md:h-[50vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/branding-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/70" />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-4xl md:text-6xl font-light text-[#FFAA17]"
        >
          Branding
        </motion.h1>
      </section>

      {/* ================= SLIDES ================= */}
      <section
        ref={containerRef}
        className="relative h-screen bg-black"
      >
        <div
          ref={slidesRef}
          className="relative h-screen flex items-center justify-center"
        >
          {ITEMS.map((item) => (
            <div
              key={item.title}   // ✅ FIXED KEY
              className="
                absolute
                w-[90%]
                max-w-6xl
                grid
                grid-cols-1
                md:grid-cols-2
                gap-8 md:gap-12
                items-start md:items-center
              "
            >
              {/* TEXT */}
              <div className="slide-text relative z-10 pt-6 md:pt-0">
                <h2 className="
  text-4xl md:text-6xl font-light text-[#FFAA17]
  inline-block
  px-5 py-3
  rounded-2xl
  bg-white/15
  backdrop-blur-md
  [mask-image:radial-gradient(circle,black_60%,transparent_100%)]
">
                  {item.title}
                </h2>




                <p className="mt-4 text-lg max-w-md text-white/80">
                  {item.desc}
                </p>

                <button
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    uppercase
                    tracking-wide
                    text-[#FFAA17]
                    border-b
                    border-[#FFAA17]
                    pb-1
                    hover:opacity-80
                    transition
                  "
                >
                  Explore
                </button>
              </div>

              {/* IMAGE */}
              <div
                className="
                  slide-image
                  relative
                  w-full
                  h-[240px] sm:h-[300px] md:h-[520px]
                  overflow-hidden
                  rounded-2xl
                "
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CLOSE ================= */}
      <button
        onClick={() => router.push("/")}
        className="
          fixed top-6 right-6 z-50
          w-11 h-11 rounded-full
          border border-white/40
          hover:bg-white/10
        "
      >
        ✕
      </button>
    </main>
  );
}
