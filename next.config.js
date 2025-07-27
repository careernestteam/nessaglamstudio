/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.pexels.com',
      'i.ibb.co',
      'example.com'
    ],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig