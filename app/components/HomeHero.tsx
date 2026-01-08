"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import BulbGearScene from "./BulbGearScene";

const NAV_ITEMS = [
  { label: "Branding", path: "/services/branding" },
  { label: "Marketing", path: "/services/marketing" },
  { label: "Advertising", path: "/services/advertising" },
];

const CLIENT_IMAGES = [
  "/clients/client1.png",
  "/clients/client2.png",
  "/clients/client3.png",
  "/clients/client4.png",
  "/clients/client5.png",
];

export default function HomeHero() {
  const router = useRouter();
  const [introDone, setIntroDone] = useState(false);
  const animatedRef = useRef(false);
  const [touched, setTouched] = useState(false);

  // ✅ controls bulb cursor interaction
  const [bulbInteractive, setBulbInteractive] = useState(false);

  // ✅ marquee ref
  const marqueeRef = useRef<HTMLDivElement>(null);

  /* -------- LISTEN FOR INTRO -------- */
  useEffect(() => {
    const onIntroComplete = () => {
      setIntroDone(true);
    };

    if ((window as any).__INTRO_DONE__) {
      setIntroDone(true);
    }

    window.addEventListener("intro:complete", onIntroComplete);
    return () => {
      window.removeEventListener("intro:complete", onIntroComplete);
    };
  }, []);

  /* -------- ANIMATE LINKS ONCE -------- */
  useEffect(() => {
    if (!introDone || animatedRef.current) return;
    animatedRef.current = true;

    const tl = gsap.timeline({ delay: 0.6 });

    gsap.set(".bulb-link", {
      y: 80,
      opacity: 0,
    });

    tl.to(".bulb-link:nth-child(1)", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
    })
      .to(
        ".bulb-link:nth-child(2)",
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
        },
        "+=0.3"
      )
      .to(
        ".bulb-link:nth-child(3)",
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
        },
        "+=0.3"
      );
  }, [introDone]);

  /* -------- CLIENTS MARQUEE ANIMATION -------- */
  useEffect(() => {
    if (!marqueeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".client-track", {
        xPercent: -50,
        duration: 45, // slow cinematic scroll
        ease: "linear",
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  /* -------- HANDLE BULB LINK CLICK -------- */
  const handleClick = (path: string) => {
    gsap.to(".bulb-link", {
      y: -40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.inOut",
    });

    gsap.delayedCall(0.9, () => {
      setBulbInteractive(true);
      router.push(path);
    });
  };

  return (
    <main className="min-h-screen text-white relative overflow-hidden flex items-center justify-center pb-32 md:pb-0">
      {/* ---------- 3D BULB + GEAR ---------- */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <BulbGearScene interactive={bulbInteractive} />
      </div>

      {/* ---------- CLIENTS GLASS BACKGROUND ---------- */}
      <div className="absolute inset-x-0 bottom-35 sm:bottom-30 md:bottom-16 lg:bottom-12 h-28 sm:h-32 md:h-18 z-[5] pointer-events-none">
        <div
          ref={marqueeRef}
          className="relative h-full overflow-hidden backdrop-blur-xl  
          [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
        >
          <div className="client-track flex items-center h-full w-max gap-20 px-20">
            {[...CLIENT_IMAGES, ...CLIENT_IMAGES].map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Client"
                draggable={false}
                className="h-8 sm:h-9 md:h-12 lg:h-14 w-auto opacity-60 grayscale transition-all duration-500"

              />
            ))}
          </div>
        </div>
      </div>

      {/* ---------- CENTER NAV ---------- */}
      <div className="
  relative z-10
  flex flex-col md:flex-row
  items-center
  gap-10 md:gap-20
  mt-45 md:mt-20 lg:mt-10
  ">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => handleClick(item.path)}
            className="bulb-link text-4xl md:text-5xl font-light tracking-wide
            hover:opacity-80 hover:scale-[1.04] transition-transform "
          >
            {item.label}
          </button>
        ))}
      </div>
    </main>
  );
}
