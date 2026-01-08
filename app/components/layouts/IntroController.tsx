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

  useEffect(() => {
    document.documentElement.classList.add("intro-overlay-active");
    return () => {
      document.documentElement.classList.remove("intro-overlay-active");
    };
  }, []);

  function handleCurtainComplete() {
    setCurtainDone(true);
    setStart3D(true);
  }

  function handleLogoCentered() {
    gsap.delayedCall(0.2, () => setStartTexts(true));
  }

  function handleTextsComplete() {
    if (isUnmountingRef.current) return;
    isUnmountingRef.current = true;

    const overlay = document.getElementById("intro-overlay");

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      onComplete: () => {
        setOverlayHidden(true);

        // 🔥 wait for DOM unmount
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            (window as any).__INTRO_DONE__ = true;
            window.dispatchEvent(new Event("intro:complete"));
          });
        });
      }

    },
    
    );
  } 

if (overlayHidden) return null;

return (
  <div
    id="intro-overlay"
    className="fixed inset-0 bg-black z-[9999]"
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
