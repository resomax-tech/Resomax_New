// app/components/layout/IntroController.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import IntroCurtain from "./Introcurtain";
import dynamic from "next/dynamic";
import gsap from "gsap";

const Intro3DScene = dynamic(() => import("./Intro3DScene"), {
  ssr: false,
  loading: () => null,
});

export default function IntroController() {
  const [curtainDone, setCurtainDone] = useState(false);
  const [start3D, setStart3D] = useState(false);
  const [startTexts, setStartTexts] = useState(false);
  const [overlayHidden, setOverlayHidden] = useState(false);
  const isUnmountingRef = useRef(false);

  // Add a global class while intro is active so the main page can be hidden
  useEffect(() => {
    // add class at mount (overlay starts visible)
    document.documentElement.classList.add("intro-overlay-active");

    return () => {
      // cleanup on unmount
      document.documentElement.classList.remove("intro-overlay-active");
    };
  }, []);

  function handleCurtainComplete() {
    // curtain finished → mount 3D once
    setCurtainDone(true);
    setStart3D(true);
  }

  function handleLogoCentered() {
    // small delay then start texts animation in 3D
    gsap.delayedCall(0.2, () => setStartTexts(true));
  }

  async function handleTextsComplete() {
    // Fade overlay out, then unmount it and remove class that hides the page.
    if (isUnmountingRef.current) return;
    isUnmountingRef.current = true;

    const overlay = document.getElementById("intro-overlay");
    if (!overlay) {
      // fallback: remove the class and unmount immediately
      document.documentElement.classList.remove("intro-overlay-active");
      setOverlayHidden(true);
      return;
    }

    gsap.to(overlay, {
  opacity: 0,
  duration: 0.9,
  ease: "power2.out",
  onComplete: () => setOverlayHidden(true),
});

  }

  if (overlayHidden) return null;

  return (
    <div
      id="intro-overlay"
      className="fixed inset-0 bg-black z-9999"
      style={{ opacity: 1 }}
    >
      {!curtainDone && <IntroCurtain onComplete={handleCurtainComplete} />}

      {start3D && (
        <Intro3DScene
          onLogoCentered={handleLogoCentered}
          startTexts={startTexts}
          onTextsComplete={handleTextsComplete}
        />
      )}
    </div>
  );
}
