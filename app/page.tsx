"use client";

import Logo from "@/app/components/Logo";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import HomeHero from "@/app/components/HomeHero";
import BulbGearScene from "@/app/components/BulbGearScene";
import { usePathname } from "next/navigation";


export default function HomePage() {
    const pathname = usePathname();

  return (
    <>
      <Logo />
      <HamburgerMenu />
      <HomeHero key={pathname}/>

    </>
  );
}


