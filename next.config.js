/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['occ-0-3011-114.1.nflxso.net', "media.suara.com", "res.cloudinary.com"],
  },
}

module.exports = nextConfig
