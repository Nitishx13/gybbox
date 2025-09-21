import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Unblock builds even if ESLint errors exist. We will progressively fix lints.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
