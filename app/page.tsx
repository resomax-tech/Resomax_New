"use client";

import BulbWithGear from "@/app/components/scene/BulbWithGear";

export default function Home() {
  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      {/* BULB BACKGROUND - allow pointer events so the bulb can react to the cursor */}
      <div className="absolute inset-0 z-0">
        <BulbWithGear />
      </div>

      {/* UI CONTENT */}
      {/* Add your UI here, which will appear above the bulb */}
    </main>
  );
}