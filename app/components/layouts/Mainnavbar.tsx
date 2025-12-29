"use client";

import { useState } from "react";
import MenuOverlay from "./MenuOverlay";

export default function MainNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-6 right-6 z-9000">
        <button
          onClick={() => setMenuOpen(true)}
          className="text-white text-3xl font-mono hover:opacity-50 transition"
          aria-label="Open Menu"
        >
          ☰
        </button>
      </div>

      {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} />}
    </>
  );
}
