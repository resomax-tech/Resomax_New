"use client";

import Logo from "./components/Logo";
import HamburgerMenu from "./components/HamburgerMenu";
import HomeHero from "./components/HomeHero";
import BulbGearScene from "./components/BulbGearScene";
import { usePathname } from "next/navigation";
import BackgroundImage from "./components/BackgroundImage";
import GoldenParticlesBackground from "./components/GoldenParticlesBackground";
export default function HomePage() {
  const pathname = usePathname();

  return (
    <>
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0">
        {/* <BackgroundImage /> */}
        <GoldenParticlesBackground />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <BulbGearScene />
      </div>


      {/* CONTENT */}
      <div className="relative z-10">
        <Logo />
        <HamburgerMenu />
        <HomeHero />
      </div>
    </>

  );
}


