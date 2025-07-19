/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    domains: ['images.unsplash.com', 'flagcdn.com'],
    unoptimized: true 
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;