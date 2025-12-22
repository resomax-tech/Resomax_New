import "./globals.css";
import type { Metadata } from "next";
import IntroController from "./components/layouts/IntroController";
import MainNavbar from "./components/layouts/Mainnavbar";

export const metadata: Metadata = {
  title: "RESO MAX",
  description: "RESOMAX – Branding · Advertising · Marketing",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">

        {/* Intro plays ONCE globally */}
        <IntroController />

        {/* Permanent Logo */}
        <img
          src="/logo.png"
          alt="resomax"
          className="fixed top-5 left-5 w-[50px] z-[9000] pointer-events-none"
        />

        <MainNavbar />

        <main>
          
          {children}</main>

      </body>
    </html>
  );
}
