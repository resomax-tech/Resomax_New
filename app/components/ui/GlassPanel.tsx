"use client";

import { ReactNode } from "react";

export default function GlassPanel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="
        relative
        rounded-2xl
        bg-white/12
        backdrop-blur-xl
        border
        border-white/10
        shadow-[0_30px_80px_rgba(0,0,0,0.35)]
        px-6
        py-8
        md:px-10
        md:py-12
      "
    >
      {children}
    </div>
  );
}
