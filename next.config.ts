import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
  // Disable SWC minification to prevent issues
  swcMinify: true,
  // Ensure webpack is configured correctly
  webpack: (config, { isServer }) => {
    return config;
  },
};

export default nextConfig;
