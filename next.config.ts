import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  // 🔥 REQUIRED for Firebase static hosting
  output: "export",

  // 🔥 REQUIRED to avoid Image Optimization errors
  images: {
    unoptimized: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
