import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // App Router is enabled by default in Next.js 16+
  // Avoid static export unless you only have static pages
  reactStrictMode: true,   // optional but recommended
  typescript: {
    ignoreBuildErrors: false, // ensure TS errors fail the build
  },
  // If you were experimenting with 'reactCompiler', it is no longer needed
  // output: 'export', <-- DON'T use this if you have client components/forms 
};

export default nextConfig;
