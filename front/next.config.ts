import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://remotive.com/job/**")],
  },
};

export default nextConfig;
