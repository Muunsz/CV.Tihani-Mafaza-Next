import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Turbopack configuration
  turbopack: {},
  // Remove swcMinify as it's not valid in Next.js 16
  // Ensure webpack is configured correctly (only for webpack builds)
  webpack: (config, { isServer }) => {
    return config;
  },
};

export default nextConfig;
