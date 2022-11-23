/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['occ-0-3011-114.1.nflxso.net', "media.suara.com"],
  }
}

module.exports = nextConfig
