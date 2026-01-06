"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";

/* ------------------ MOTION VARIANTS ------------------ */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    y: 28,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ------------------ PAGE ------------------ */

export default function ContactPage() {
  const router = useRouter(); // ✅ FIX

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* ❌ CLOSE BUTTON */}
      <button
        onClick={() => router.push("/")}
        aria-label="Close contact page"
        className="
          fixed top-6 right-6 z-50
          w-11 h-11 rounded-full
          border border-white/40
          flex items-center justify-center
          text-white/80 text-xl
          hover:border-[#FFAA17] hover:text-[#FFAA17]
          transition
        "
      >
        ✕
      </button>

      <section className="relative z-10 pt-32 pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-6xl px-6 md:px-12 space-y-16"
        >
          {/* HEADER */}
          <motion.div
            variants={fadeUp}
            className="grid md:grid-cols-2 gap-6"
          >
            <h1 className="text-4xl text-[#FFAA17] font-light">
              Contact
            </h1>

            <p className="text-xl md:text-2xl font-light leading-relaxed text-white/85">
              Let’s talk about ideas, collaborations, or new opportunities.
              Tell us what you’re building — we’ll take it from there.
            </p>
          </motion.div>

          {/* CONTENT */}
          <div className="grid md:grid-cols-2 gap-14">
            {/* DETAILS */}
            <motion.div
              variants={fadeUp}
              className="space-y-8"
            >
              <div>
                <p className="text-sm uppercase tracking-wider text-[#FFAA17] mb-1">
                  Email
                </p>
                <p className="text-lg text-white/80">
                  hello@resomaxtech.com
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-wider text-[#FFAA17] mb-1">
                  Phone
                </p>
                <p className="text-lg text-white/80">
                  +91 9XXXXXXXXX
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-wider text-[#FFAA17] mb-1">
                  Location
                </p>
                <p className="text-lg text-white/80">
                  Hyderabad, India
                </p>
              </div>
            </motion.div>

            {/* FORM */}
            <motion.div
              variants={fadeUp}
              className="space-y-8"
            >
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                  e.preventDefault()
                }
                className="space-y-8"
              >
                {/* NAME */}
                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="text-sm text-[#FFAA17]"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="
                      w-full bg-transparent
                      border-b border-white/30
                      py-2.5 text-lg text-white
                      outline-none focus:border-white transition
                    "
                  />
                </div>

                {/* EMAIL */}
                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="text-sm text-[#FFAA17]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="
                      w-full bg-transparent
                      border-b border-white/30
                      py-2.5 text-lg text-white
                      outline-none focus:border-white transition
                    "
                  />
                </div>

                {/* MESSAGE */}
                <div className="space-y-1">
                  <label
                    htmlFor="message"
                    className="text-sm text-[#FFAA17]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    className="
                      w-full bg-transparent
                      border-b border-white/30
                      py-2.5 text-lg text-white
                      outline-none resize-none
                      focus:border-white transition
                    "
                  />
                </div>

                {/* SUBMIT */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="
                      text-lg font-light text-[#FFAA17]
                      border-b border-white pb-1
                      hover:opacity-70 transition
                    "
                  >
                    Send message →
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
