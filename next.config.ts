import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "thaimuslimeducation.com",
      },
      {
        protocol: "https",
        hostname: "en.thaimuslimeducation.com",
      },
    ],
  },
};

export default nextConfig;
