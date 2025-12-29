"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BulbGearSVG() {
  const gearRef = useRef<SVGGElement>(null);
  const bulbRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Gear rotation
    gsap.to(gearRef.current, {
      rotate: 360,
      transformOrigin: "50% 50%",
      duration: 6,
      ease: "linear",
      repeat: -1,
    });

    // Bulb glow pulse
    gsap.to(bulbRef.current, {
      opacity: 0.6,
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className="bulb-svg-wrapper">
      <svg
        width="280"
        height="360"
        viewBox="0 0 64 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bulb Outline */}
        <path
          ref={bulbRef}
          d="M32 2C18 2 8 12.5 8 26c0 8.5 4 13.5 7.5 18.5C18.5 48 19 50 19 54v4h26v-4c0-4 0.5-6 3.5-9.5C52 39.5 56 34.5 56 26 56 12.5 46 2 32 2Z"
          stroke="white"
          strokeWidth="3"
          fill="none"
        />

        {/* Bulb Base */}
        <rect x="22" y="58" width="20" height="6" rx="2" fill="white" />
        <rect x="24" y="64" width="16" height="6" rx="2" fill="white" />

        {/* Gear */}
        <g ref={gearRef} transform="translate(32 32)">
          <path
            d="
            M6 0
            L4.5 2.5
            L6 5
            L3.5 6
            L2.5 4.5
            L0 6
            L-2.5 4.5
            L-3.5 6
            L-6 5
            L-4.5 2.5
            L-6 0
            L-4.5 -2.5
            L-6 -5
            L-3.5 -6
            L-2.5 -4.5
            L0 -6
            L2.5 -4.5
            L3.5 -6
            L6 -5
            L4.5 -2.5
            Z
            "
            fill="white"
          />
          <circle r="2" fill="black" />
        </g>
      </svg>
    </div>
  );
}
