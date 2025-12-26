"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import FracturedSphere from "@/app/components/backgrounds/FracturedSphere";
// import LineBackground from "@/app/components/animations/LineBackground";

export default function ContactPage() {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.12,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* SAME BACKGROUND AS ABOUT */}
      {/* <LineBackground /> */}
      <div className="fixed inset-0 z-0 pointer-events-none">
              <FracturedSphere />
            </div>

      <section className="relative z-10 pt-44 pb-32">
        <div
          ref={contentRef}
          className="mx-auto max-w-6xl px-6 md:px-12 space-y-24"
        >
          {/* HEADER */}
          <div className="grid md:grid-cols-2 gap-8">
            <h1 className="text-lg text-white/80 font-light">
              Contact
            </h1>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/85">
              Let’s talk about ideas, collaborations, or new opportunities.
              Tell us what you’re building — we’ll take it from there.
            </p>
          </div>

          {/* CONTENT */}
          <div className="grid md:grid-cols-2 gap-20">
            {/* DETAILS */}
            <div className="space-y-12">
              <div>
                <p className="text-sm uppercase tracking-wider text-white/50 mb-2">
                  Email
                </p>
                <p className="text-lg text-white/80">
                  hello@resomaxtech.com
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-wider text-white/50 mb-2">
                  Phone
                </p>
                <p className="text-lg text-white/80">
                  +91 9XXXXXXXXX
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-wider text-white/50 mb-2">
                  Location
                </p>
                <p className="text-lg text-white/80">
                  Hyderabad, India
                </p>
              </div>
            </div>

            {/* FORM */}
            <form
              className="space-y-10"
              onSubmit={(e) => e.preventDefault()}
            >
              {["Name", "Email"].map((label) => (
                <div key={label} className="space-y-2">
                  <label className="text-sm text-white/60">
                    {label}
                  </label>
                  <input
                    type={label === "Email" ? "email" : "text"}
                    required
                    className="
                      w-full
                      bg-transparent
                      border-b border-white/30
                      py-3
                      text-lg
                      text-white
                      outline-none
                      focus:border-white
                      transition
                    "
                  />
                </div>
              ))}

              <div className="space-y-2">
                <label className="text-sm text-white/60">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  className="
                    w-full
                    bg-transparent
                    border-b border-white/30
                    py-3
                    text-lg
                    text-white
                    outline-none
                    resize-none
                    focus:border-white
                    transition
                  "
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="
                    text-lg
                    font-light
                    text-white
                    border-b border-white
                    pb-1
                    hover:opacity-70
                    transition
                  "
                >
                  Send message →
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
