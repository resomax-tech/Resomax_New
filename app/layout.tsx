import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RESO MAX",
  description: "Creative Agency — Branding, Marketing, Advertising",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
