"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";


// const clients = [
//   "/clients/client1.png",
//   "/clients/client2.png",
//   "/clients/client3.png",
//   "/clients/client4.png",
//   "/clients/client5.png",
// ];

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const topRef = useRef<HTMLButtonElement | null>(null);
  const bottomRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.2 });

    tl.fromTo(
      headingRef.current,
      { opacity: 0 },
      { opacity: 0.9, duration: 2.2, ease: "power2.out" }
    )
      .fromTo(topRef.current, { opacity: 0 }, { opacity: 0.8, duration: 1 }, "-=1.4")
      .fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 0.7, duration: 1 }, "-=0.6")
      .fromTo(bottomRef.current, { opacity: 0 }, { opacity: 0.6, duration: 1 }, "-=0.6");
  }, []);

  return (
    <main className="relative w-full h-screen bg-black text-white overflow-hidden flex items-center justify-center">

      {/* DIAMOND */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* <DiamondScene /> */}
        

      </div>

      

      {/* HEADING */}
      <h1
        ref={headingRef}
        className="
          absolute
          top-[42%]
          text-lg md:text-xl
          tracking-wide
          text-white
          opacity-0
        "
      >
        RESOMAX TECHNOLOGIES
      </h1>

      {/* TOP LINK */}
      <button
        ref={topRef}
        onClick={() => router.push("/clients")}
        className="
          absolute top-10
          tracking-[0.25em]
          text-sm
          text-white
          hover:opacity-70
          transition
        "
      >
        VIEW ALL CLIENTS
      </button>

      {/* SUBTITLE */}
      <p
        ref={subtitleRef}
        className="
          absolute bottom-[30%]
          text-sm
          tracking-[0.25em]
          text-white
        "
      >
        Branding • Advertising • Marketing
      </p>

      


      {/* SCROLL HINT */}
      <p
        ref={bottomRef}
        className="absolute bottom-10 text-xs tracking-[0.25em] text-white/50"
      >
        SCROLL ↓
      </p>
    </main>
  );
}
