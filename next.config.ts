import type { NextConfig } from "next";

// Create next.config.js file
const nextConfig: NextConfig = {
  // Enable React Strict Mode to help detect potential issues
  reactStrictMode: true,

  // Add logging to the Webpack configuration
  webpack(config, { isServer }) {
    console.log('Webpack config:', config); // Log Webpack config for debugging
    return config;
  },

  env: {
    NEXT_DEBUG: process.env.NEXT_DEBUG || 'true', // Set NEXT_DEBUG environment variable
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
