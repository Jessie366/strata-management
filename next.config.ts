import type { NextConfig } from "next";

// Create next.config.js file
const nextConfig: NextConfig = {
  // Enable React Strict Mode to help detect potential issues
  reactStrictMode: true,

  // Add logging to the Webpack configuration
  webpack(config, { isServer }) {
    if (!isServer){
    console.log('Webpack config:', config); 
    }// Log Webpack config for debugging
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
