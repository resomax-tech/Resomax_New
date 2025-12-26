"use client";

import FracturedSphere from "@/app/components/backgrounds/FracturedSphere";
import GlassPanel from "@/app/components/ui/GlassPanel";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FracturedSphere />
      </div>

      {/* Content */}
      <section className="relative z-10 pt-44 pb-36">
        <div
          className="
            mx-auto
            max-w-6xl
            px-6 md:px-12 lg:px-16
            space-y-20 md:space-y-28
          "
        >
          {/* ABOUT */}
          <GlassPanel>
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              <h2 className="text-2xl md:text-3xl font-light text-[#FFAA17]">
                About ResoMax
              </h2>

              <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-white/90">
                ResoMax Technologies is a digital-first branding, marketing, and
                technology company helping businesses grow in a fast-moving
                digital world. We focus on building strong brand foundations,
                meaningful customer experiences, and scalable digital solutions.
              </p>
            </div>
          </GlassPanel>

          {/* WHO WE ARE */}
          <GlassPanel>
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              <h2 className="text-2xl md:text-3xl font-light text-[#FFAA17]">
                Who We Are
              </h2>

              <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-white/90">
                We are a multidisciplinary team of strategists, designers,
                marketers, and developers working together to transform ideas
                into impactful digital products and campaigns.
              </p>
            </div>
          </GlassPanel>

          {/* WHAT WE DO */}
          <GlassPanel>
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              <h2 className="text-2xl md:text-3xl font-light text-[#FFAA17]">
                What We Do
              </h2>

              <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-white/90">
                Our services include brand identity, digital marketing,
                performance advertising, web and mobile development, UI/UX
                design, and integrated digital solutions.
              </p>
            </div>
          </GlassPanel>

          {/* OUR APPROACH */}
          <GlassPanel>
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              <h2 className="text-2xl md:text-3xl font-light text-[#FFAA17]">
                Our Approach
              </h2>

              <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-white/90">
                We believe in clarity over noise. Every solution is driven by
                strategy, creativity, and technology — built to endure and scale.
              </p>
            </div>
          </GlassPanel>
        </div>
      </section>
    </main>
  );
}
