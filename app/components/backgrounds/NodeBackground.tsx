"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function AnimatedNodeBackground() {
  useEffect(() => {
    gsap.to(".node-group", {
      opacity: 0.35,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
    >
      <g className="node-group" stroke="#FFAA17" strokeWidth="1" opacity="0.2">
        <line x1="100" y1="200" x2="400" y2="300" />
        <line x1="400" y1="300" x2="700" y2="200" />
        <line x1="200" y1="600" x2="500" y2="500" />
        <line x1="500" y1="500" x2="800" y2="700" />
      </g>

      <g className="node-group" fill="#FFAA17" opacity="0.35">
        <circle cx="100" cy="200" r="4" />
        <circle cx="400" cy="300" r="4" />
        <circle cx="700" cy="200" r="4" />
        <circle cx="200" cy="600" r="4" />
        <circle cx="500" cy="500" r="4" />
        <circle cx="800" cy="700" r="4" />
      </g>
    </svg>
  );
}
