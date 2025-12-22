"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = { onComplete: () => void };

export default function IntroCurtain({ onComplete }: Props) {
  const left = useRef<HTMLDivElement | null>(null);
  const right = useRef<HTMLDivElement | null>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (hasPlayed.current) return;
    hasPlayed.current = true;

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" }, onComplete });

    tl.to(left.current, { xPercent: -100, duration: 1.1 })
      .to(right.current, { xPercent: 100, duration: 1.1 }, "<");
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div ref={left} className="absolute left-0 top-0 w-1/2 h-full" style={{ background: "#374151" }} />
      <div ref={right} className="absolute right-0 top-0 w-1/2 h-full" style={{ background: "#374151" }} />
    </div>
  );
}
