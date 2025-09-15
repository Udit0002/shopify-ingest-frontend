import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 🚨 This makes build succeed even if ESLint finds errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 🚨 This makes build succeed even if TypeScript has errors
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
