"use client";

import { useState } from "react";
import MenuOverlay from "./MenuOverlay";

export default function MainNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-5 right-5 z-[9000]">
        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="text-white text-3xl font-bold"
        >
          ☰
        </button>
      </div>

      {/* MENU OVERLAY */}
      {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} />}
    </>
  );
}
