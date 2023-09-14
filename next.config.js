/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    experimental: {
      serverComponentsExternalPackages: ['cloudinary', 'graphql-request']
    }
  }
  
  module.exports = nextConfig