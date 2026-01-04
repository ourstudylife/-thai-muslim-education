import type { NextConfig } from "next";

const isExport = process.env.BUILD_STANDALONE === "true";

const nextConfig: NextConfig = {
  output: isExport ? "export" : undefined,
  trailingSlash: isExport,
  images: {
    unoptimized: isExport,
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
