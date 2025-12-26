import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import IntroController from "./components/layouts/IntroController";
import MainNavbar from "./components/layouts/Mainnavbar";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dm",
});

export const metadata: Metadata = {
  title: "RESO MAX",
  description: "RESOMAX – Branding · Advertising · Marketing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${dmSans.variable}
          font-sans
          bg-black
          text-white
        `}
      >
        {/* Intro plays ONCE globally */}
        <IntroController />

        {/* Permanent Logo */}
        <img
          src="/logo.png"
          alt="resomax"
          className="fixed top-5 left-5 w-[50px] z-9000 pointer-events-none"
        />

        {/* Global Navigation */}
        <MainNavbar />

        <main>{children}</main>
      </body>
    </html>
  );
}
