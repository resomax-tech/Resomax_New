"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // ❌ Don't show footer on home page
  if (pathname === "/") return null;

  return <Footer />;
}
