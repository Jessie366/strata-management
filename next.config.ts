import type { NextConfig } from "next";

// Create next.config.js file
const nextConfig: NextConfig = {
  // Enable React Strict Mode to help detect potential issues
  reactStrictMode: true,

  // Add logging to the Webpack configuration
  webpack(config, { isServer }) {
    if (!isServer){
    }
    return config;
  },

  env: {
    NEXT_DEBUG: process.env.NEXT_DEBUG || 'false', // Set NEXT_DEBUG environment variable
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
