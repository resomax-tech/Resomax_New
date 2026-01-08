"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

const MENU_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggle = () => {
    setOpen((prev) => !prev);

    if (!open) {
      gsap.fromTo(
        ".menu-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }
  };

  const handleNavigate = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={toggle}
        className="fixed top-6 right-6 z-50 text-white text-3xl"
      >
        {open ? "✕" : "☰"}
      </button>

      {/* Menu Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/90 z-40 flex items-center justify-center">
          <div className="space-y-6 text-center">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigate(item.path)}
                className="
                  menu-item
                  block
                  text-white
                  text-3xl
                  font-light
                  hover:text-[#FFAA17]
                  transition
                "
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
