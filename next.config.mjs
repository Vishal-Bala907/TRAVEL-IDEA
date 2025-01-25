/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    disableErrorOverlay: true, // Disable the <nextjs-portal> and error overlay in development
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during builds (optional)
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during builds (optional)
  },
};

export default nextConfig;
