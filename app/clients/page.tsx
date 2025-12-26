"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Client = {
  name: string;
  image: string;
};

const clients: Client[] = [
  { name: "Haier", image: "/clients/client1.png" },
  { name: "Zee5", image: "/clients/client2.png" },
  { name: "Abhibus", image: "/clients/client3.png" },
  { name: "Apollo", image: "/clients/client4.png" },
  { name: "Dr reedy's", image: "/clients/client5.png" },
  { name: "KFC", image: "/clients/client6.png" },
];

export default function OurClients() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || !sectionRef.current) return;

    const cards = Array.from(gridRef.current.children);

    /* ---------------- ENTRY ANIMATION ---------------- */
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: {
          each: 0.18,
          from: "start",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    /* ---------------- IMAGE PARALLAX ---------------- */
    cards.forEach((card) => {
      const img = card.querySelector("img");
      if (!img) return;

      gsap.fromTo(
        img,
        { y: 18 },
        {
          y: -18,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white py-36 overflow-hidden"
    >
      {/* 🌑 VIGNETTE */}
      <div className="pointer-events-none absolute inset-0 bg-confirmation-gradient opacity-70" />

      {/* 🌫 GRAIN */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\"/></filter><rect width=\"200\" height=\"200\" filter=\"url(%23n)\" opacity=\"0.4\"/></svg>')",
        }}
      />

      {/* HEADER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 mb-24">
        <h2 className="text-sm tracking-widest text-white/60 mb-4">
          OUR CLIENTS
        </h2>
        <p className="text-2xl md:text-3xl font-light text-white/85 max-w-3xl">
          We collaborate with brands and partners to create meaningful,
          enduring digital experiences.
        </p>
      </div>

      {/* GRID */}
      <div
        ref={gridRef}
        className="
          relative z-10
          max-w-6xl
          mx-auto
          px-6
          md:px-16
          grid
          grid-cols-1
          md:grid-cols-2
          gap-20
        "
      >
        {clients.map((client, i) => (
          <div
            key={i}
            className="
              group
              relative
              bg-white/5
              border border-white/10
              rounded-2xl
              p-14
              flex
              flex-col
              items-center
              justify-center
              text-center
              backdrop-blur
              transition
              hover:bg-white/10
            "
          >
            {/* IMAGE */}
            <img
              src={client.image}
              alt={client.name}
              className="
                h-28
                object-contain
                mb-10
                opacity-80
                transition-all
                duration-500
                group-hover:opacity-100
                group-hover:scale-105
              "
            />

            {/* NAME */}
            <span className="text-sm tracking-wide text-white/60 transition group-hover:text-white">
              {client.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
