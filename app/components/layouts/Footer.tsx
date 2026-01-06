"use client";

import { useRouter } from "next/navigation";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="relative bg-black text-white overflow-hidden">

      {/* BACKGROUND BIG TEXT */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        <h1 className="text-[22vw] font-bold tracking-tight text-white/[0.04] leading-none select-none">
          RESOMAX
        </h1>
      </div>

      {/* MAIN FOOTER CONTENT */}
      <div className="relative z-10 px-6 md:px-20 pt-24 pb-20">

        {/* NAV BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mb-24">
          {[
            ["Home", "/"],
            ["About", "/about"],
            ["Services", "/"],
            ["Contact", "/contact"],
          ].map(([label, path]) => (
            <button
              key={label}
              onClick={() => router.push(path)}
              className="
                px-6 py-2
                rounded-full
                border border-white/15
                text-sm uppercase tracking-wide
                text-white/80
                hover:text-white
                hover:border-white/40
                transition-all duration-300
              "
            >
              {label}
            </button>
          ))}
        </div>

        {/* CENTER SCROLL TO TOP */}
        <div className="flex justify-center mb-24">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="
              w-14 h-14
              rounded-full
              border border-white/20
              flex items-center justify-center
              text-white/70
              hover:text-white
              hover:border-white/50
              transition-all duration-300
            "
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>

        {/* BOTTOM META */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/40">
          <div className="flex gap-4">
            <span>Powered by ResoMax</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          <div className="flex gap-6">
            {["Style Guide", "Licenses", "Changelog"].map((item) => (
              <button
                key={item}
                className="hover:text-white transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
