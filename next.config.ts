import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
