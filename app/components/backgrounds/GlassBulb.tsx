"use client";

import BulbSVG from "./BulbSVG";

export default function GlassBulb() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
      <BulbSVG />
    </div>
  );
}
