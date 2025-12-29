// IntroCurtain.tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = { onComplete: () => void };

export default function IntroCurtain({ onComplete }: Props) {
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (hasPlayed.current) return;
    hasPlayed.current = true;

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete,
    });

    tl.to(left.current, { xPercent: -102, duration: 1.4 })
      .to(right.current, { xPercent: 102, duration: 1.4 }, "<+=0.05");
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-100 pointer-events-none">
      <div ref={left} className="absolute left-0 top-0 w-1/2 h-full bg-gray-600" />
      <div ref={right} className="absolute right-0 top-0 w-1/2 h-full bg-gray-600" />
    </div>
  );
}
