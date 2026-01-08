import "./globals.css";
import IntroController from "./components/layouts/IntroController";
import localFont from "next/font/local";
import FooterWrapper from "./components/layouts/FooterWrapper";

const neueHaas = localFont({
  src: [
    { path: "./fonts/NeueHaasDisplay-Thin.woff2", weight: "300" },
    { path: "./fonts/NeueHaasDisplay-Light.woff2", weight: "400" },
    { path: "./fonts/NeueHaasDisplay-Mediu.woff2", weight: "500" },
  ],
  variable: "--font-neuehaas",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={neueHaas.variable}
    >
      <body className="bg-white text-white">
        <IntroController />
        {children}
        <FooterWrapper /> {/* 👈 Footer hidden on home */}
      </body>
    </html>
  );
}
