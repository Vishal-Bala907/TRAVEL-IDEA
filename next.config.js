module.exports = {
  reactStrictMode: true,
  reactDevOverlay: false,
  eslint: {
    ignoreDuringBuilds: true, // Optionally ignore ESLint errors during production builds
  },
  experimental: {
    disableErrorOverlay: true, // Disables the default error overlay in Next.js
  },
};
