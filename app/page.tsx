"use client";

import Logo from "./components/Logo";
import HamburgerMenu from "./components/HamburgerMenu";
import HomeHero from "./components/HomeHero";
import BulbGearScene from "./components/BulbGearScene";
import GoldenParticlesBackground from "./components/GoldenParticlesBackground";
export default function HomePage() {
  

  return (
    <>
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0">
        {/* <BackgroundImage /> */}
        <GoldenParticlesBackground />
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


