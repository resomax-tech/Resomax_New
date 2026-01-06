"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Story = {
  title: string;
  subtitle: string;
  image: string;
  content: string;
};

const STORIES: Story[] = [
  {
    title: "Marketing Strategy",
    subtitle: "Business Development · Scale Up",
    image: "/marketing/marketing.jpg",
    content:
      "We helped businesses scale through performance marketing, audience segmentation, and channel optimization, delivering sustained growth and measurable ROI.",
  },
  {
    title: "Digital Marketing",
    subtitle: "Brand Growth · Market Expansion",
    image: "/marketing/digital.jpg",
    content:
      "Our digital marketing systems combine SEO, paid acquisition, and conversion optimization to expand reach and accelerate growth.",
  },
  {
    title: "Content Marketing",
    subtitle: "Digital Strategy · Performance",
    image: "/marketing/content.jpg",
    content:
      "We create content ecosystems that attract, engage, and retain audiences across platforms.",
  },
  {
    title: "Social Media Management",
    subtitle: "Community · Engagement",
    image: "/marketing/socialmedia.jpg",
    content:
      "We manage brand presence and engagement across social platforms with clarity and consistency.",
  },
  {
    title: "Paid Advertising (PPC & Social Ads)",
    subtitle: "Performance · ROI",
    image: "/marketing/paid.jpg",
    content:
      "Targeted advertising strategies focused on performance, efficiency, and scale.",
  },
  {
    title: "Email Marketing",
    subtitle: "Retention · Growth",
    image: "/marketing/email.jpg",
    content:
      "Strategic email communication designed to build long-term customer relationships.",
  },
  {
    title: "SEO & Organic Growth",
    subtitle: "Visibility · Search",
    image: "/marketing/seo.jpg",
    content:
      "Search optimization strategies that improve visibility, traffic, and long-term growth.",
  },
  {
    title: "Analytics & Performance Tracking",
    subtitle: "Insights · Optimization",
    image: "/marketing/analytics.jpg",
    content:
      "Measuring performance, extracting insights, and continuously optimizing for growth.",
  },
];

export default function MarketingPage() {
  const router = useRouter();
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      const content = section.querySelector(".content");
      const image = section.querySelector(".image");
      const line = section.querySelector(".top-line");

      gsap.fromTo(
        [line, content],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        }
      );

      if (image) {
        gsap.fromTo(
          image,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
            },
          }
        );
      }
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white px-6 md:px-20 py-28">

      {/* HEADER */}
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[55vh] md:h-[65vh] w-full overflow-hidden">

        {/* HERO IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/marketing/hero.webp')",
          }}
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />

        {/* HERO CONTENT */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <h1 className="text-5xl md:text-6xl font-light text-[#FFAA17]">
              Marketing That Scales
            </h1>

            <p className="mt-5 max-w-2xl text-xl text-white/80">
              Growth-focused strategies built on data, creativity, and performance.
            </p>
          </div>
        </div>
      </section>


      {/* PANELS */}
      <section className="max-w-7xl mx-auto space-y-12">
        {STORIES.map((story, index) => {
          const isReverse = index % 2 === 1;

          return (
            <div
              key={index}
              ref={(el) => {
                if (el) sectionRefs.current[index] = el;
              }}
              className="relative bg-[#161616] rounded-xl overflow-hidden"
            >
              {/* FULL WIDTH TOP LINE */}
              <div className="top-line absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[2px] bg-[#FFAA17]" />

              <div className="grid md:grid-cols-2 gap-10 md:gap-14 px-6 md:px-14 py-14 md:py-16">

                {/* IMAGE */}
                <div
                  className={`image relative hidden md:block ${isReverse ? "md:order-1" : "md:order-2"
                    }`}
                >
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                  </div>
                </div>

                {/* CONTENT */}
                <div
                  className={`content ${isReverse ? "md:order-2" : "md:order-1"
                    }`}
                >
                  <span className="text-sm text-white/80">
                    {story.subtitle}
                  </span>

                  <h2 className="mt-4 text-3xl md:text-5xl font-light text-[#FFAA17] leading-tight">
                    {story.title}
                  </h2>

                  <p className="mt-5 text-lg text-white/70 leading-relaxed max-w-xl">
                    {story.content}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* CLOSE BUTTON */}
      <button
        onClick={() => router.push("/")}
        className="
          fixed top-6 right-6 z-50
          w-11 h-11
          rounded-full
          border border-white/40
          flex items-center justify-center
          hover:bg-white/10
        "
      >
        ✕
      </button>
    </main>
  );
}
